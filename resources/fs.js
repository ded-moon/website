// fs.js

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
                                content: "this is a placeholder. More content will be added in the future."
                            },
                            "project.txt": {  
                                type: "file",
                                contentType: "html",
                                content: "projects.html"
                            }
                        }
                    }
                }
            }
        }
    }
};