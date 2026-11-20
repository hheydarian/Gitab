const fs = require('fs');
const path = require('path');

// 1. Patch FileSystemManager for Windows EBUSY file lock retry
const fsManagerFile = path.join(__dirname, 'node_modules', '@11ty', 'eleventy', 'src', 'Util', 'FileSystemManager.js');
if (fs.existsSync(fsManagerFile)) {
    let content = fs.readFileSync(fsManagerFile, 'utf8');
    const target = 'fs.writeFileSync(filePath, content);';
    const replacement = `let attempts = 0;
\t\twhile (true) {
\t\t\ttry {
\t\t\t\tfs.writeFileSync(filePath, content);
\t\t\t\tbreak;
\t\t\t} catch (err) {
\t\t\t\tattempts++;
\t\t\t\tif (attempts <= 5 && (err.code === "UNKNOWN" || err.code === "EBUSY" || err.code === "EPERM")) {
\t\t\t\t\tconst start = Date.now();
\t\t\t\t\twhile (Date.now() - start < 80) {}
\t\t\t\t} else {
\t\t\t\t\tthrow err;
\t\t\t\t}
\t\t\t}
\t\t}`;
    if (content.includes(target)) {
        content = content.replace(target, replacement);
        fs.writeFileSync(fsManagerFile, content, 'utf8');
        console.log('Successfully patched FileSystemManager.js for Windows file lock retry.');
    } else {
        console.log('FileSystemManager.js: Already patched.');
    }
} else {
    console.log('FileSystemManager.js: Target file not found.');
}

// 2. Patch @11ty/eleventy-dev-server for case-insensitive pathPrefix (/gitab/ vs /Gitab/)
const devServerFile = path.join(__dirname, 'node_modules', '@11ty', 'eleventy-dev-server', 'server.js');
if (fs.existsSync(devServerFile)) {
    let serverContent = fs.readFileSync(devServerFile, 'utf8');
    const targetCheck = 'if (!url.startsWith(this.options.pathPrefix)) {';
    const targetCheckReplacement = 'if (!url.toLowerCase().startsWith(this.options.pathPrefix.toLowerCase())) {';
    
    if (serverContent.includes(targetCheck)) {
        serverContent = serverContent.replace(targetCheck, targetCheckReplacement);
        fs.writeFileSync(devServerFile, serverContent, 'utf8');
        console.log('Successfully patched eleventy-dev-server for case-insensitive pathPrefix.');
    } else if (serverContent.includes(targetCheckReplacement)) {
        console.log('eleventy-dev-server: Already patched for case-insensitive pathPrefix.');
    }
}

// 3. Patch Eleventy Benchmark.js so concurrent watch/config reloads do not throw "Benchmark after() without a before()"
const benchmarkFile = path.join(__dirname, 'node_modules', '@11ty', 'eleventy', 'src', 'Benchmark', 'Benchmark.js');
if (fs.existsSync(benchmarkFile)) {
    let benchContent = fs.readFileSync(benchmarkFile, 'utf8');
    const benchTarget = 'throw new Error("You called Benchmark after() without a before().");';
    const benchReplacement = 'return;';
    if (benchContent.includes(benchTarget)) {
        benchContent = benchContent.replace(benchTarget, benchReplacement);
        fs.writeFileSync(benchmarkFile, benchContent, 'utf8');
        console.log('Successfully patched Benchmark.js for safe concurrent watch rebuilds.');
    } else {
        console.log('Benchmark.js: Already patched.');
    }
}
