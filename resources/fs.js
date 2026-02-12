// fs.js
// this might get out of hand

export const fileSystem = {
    "/": {
        type: "dir",
        children: {
            home: {
                type: "dir",
                children: {
                    "about.txt": {   
                        type: "file",
                        contentType: "html",
                        content: "about.html"
                    },
                    "contact.txt": {   
                        type: "file",
                        contentType: "html",
                        content: "contact.html"
                    },
                    projects: {
                        type: "dir",
                        children: {
                            "placeholder.txt": {  
                                type: "file",
                                contentType: "text",
                                content: "this is a placeholder"
                            }
                        }
                    }
                }
            }
        }
    }
};
