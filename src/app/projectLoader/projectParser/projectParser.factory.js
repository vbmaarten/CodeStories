"use strict";

angular.module("projectLoader").factory("projectParser", function() {
    return {
        loadZip: function(data) {
            var root = {};

            var zip = new JSZip(data);
            files = Object.keys(zip.files);
            for (var file_i = 0; file_i < files.length; file_i++) {
                file = zip.files[files[file_i]];
                path = file.name.split("/");
                save_root = root;
                for (var i = 0; i < path.length; i++) {
                    if (i == path.length - 1) {
                        if (path[i] != "") {
                            extension = path[i].split(".");
                            extension = extension[extension.length - 1];
                            content = zip.file(file.name).asBinary();
                            save_root[path[i]] = {
                                content: content
                            };
                        }
                    } else {
                        if (!save_root.hasOwnProperty(path[i] + "/")) {
                            save_root[path[i] + "/"] = {};
                        }
                        save_root = save_root[path[i] + "/"];
                    }
                }
            }

            return root;
        }
    };
} );