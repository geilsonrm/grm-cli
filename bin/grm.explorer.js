
const fs = require('fs');
const path = require("path");
const util = {
	pump: require("pump")
}

const mkdir = function (dir) {
	// making directory without exception if exists
	try {
		fs.mkdirSync(dir, 0755);
	} catch (e) {
		if (e.code != "EEXIST") {
			throw e;
		}
	}
};

const rmdir = function (dir) {

	var list = fs.readdirSync(dir);
	for (var i = 0; i < list.length; i++) {
		var filename = path.join(dir, list[i]);
		var stat = fs.statSync(filename);

		if (filename == "." || filename == "..") {
			// pass these files
		} else if (stat.isDirectory()) {
			// rmdir recursively
			rmdir(filename);
		} else {
			// rm fiilename
			fs.unlinkSync(filename);
		}
	}
	fs.rmdirSync(dir);
};

const copyDir = function (src, dest) {
	mkdir(dest);
	var files = fs.readdirSync(src);
	for (var i = 0; i < files.length; i++) {
		var current = fs.lstatSync(path.join(src, files[i]));
		if (current.isDirectory()) {
			console.log('É DIRETORIO...1.....')
			copyDir(path.join(src, files[i]), path.join(dest, files[i]));
		} else if (current.isSymbolicLink()) {
			var symlink = fs.readlinkSync(path.join(src, files[i]));
			fs.symlinkSync(symlink, path.join(dest, files[i]));
		} else {
			copy(path.join(src, files[i]), path.join(dest, files[i]));
		}
	}
}

const copy = function (src, dest) {
	var oldFile = fs.createReadStream(src);
	var newFile = fs.createWriteStream(dest);
	util.pump(oldFile, newFile);
};



module.exports = { mkdir, rmdir, copyDir, copy }