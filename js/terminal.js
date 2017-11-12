//original script by Jakub Jankiewicz, from http://terminal.jcubic.pl/
var themeColors = {
    codingSkills : ["#11DAFF","#1B9CFF"],
    otherSkills : ["#2CFF00","#17A600"],
    webDev : ["#2CFF00","#17A600"],
    analytics : ["#11DAFF","#1B9CFF"],
    help : ["#FF3B0D", "#FF0D4E"]
}

var customCommands = {
    "codingSkills" : function(term) {
        var divCount = 0;
        term.echo("type any skill from the list for its description", {
            finalize: function(div) {
                divCount += 1;
                div.css("color", themeColors.codingSkills[1]);
            }
        });
        for (var n = 0; n < allSkills.length; n++) {
            var color;
            if (allSkills[n].type == "coding") {
                term.echo(allSkills[n].name, {
                    finalize: function(div) {
                        if (color == themeColors.codingSkills[0]) {
                            color = themeColors.codingSkills[1];
                        } else {
                            color = themeColors.codingSkills[0];
                        };
                        divCount += 1;
                        div.css("color", color);
                    }
                });
            };
        };
    },
    "otherSkills" : function(term) {
        var divCount = 0;
        term.echo("type any skill from the list for its description", {
            finalize: function(div) {
                divCount += 1;
                div.css("color", themeColors.otherSkills[1]);
            }
        });
        for (var n = 0; n < allSkills.length; n++) {
            var color;
            if (allSkills[n].type == "other") {
                term.echo(allSkills[n].name, {
                    finalize: function(div) {
                        if (color == themeColors.otherSkills[0]) {
                            color = themeColors.otherSkills[1];
                        } else {
                            color = themeColors.otherSkills[0];
                        };
                        divCount += 1;
                        div.css("color", color);
                    }
                });
            };
        };
    },
    "analytics" : function(term) {
        var divCount = 0;
        term.echo("type any analytics skill from the list for its description", {
            finalize: function(div) {
                divCount += 1;
                div.css("color", themeColors.otherSkills[1]);
            }
        });
        for (var n = 0; n < allSkills.length; n++) {
            var color;
            if (allSkills[n].type == "analytics") {
                term.echo(allSkills[n].name, {
                    finalize: function(div) {
                        if (color == themeColors.otherSkills[0]) {
                            color = themeColors.otherSkills[1];
                        } else {
                            color = themeColors.otherSkills[0];
                        };
                        divCount += 1;
                        div.css("color", color);
                    }
                });
            };
        };
    },
    "webDev" : function(term) {
        var divCount = 0;
        term.echo("type any skill from the list for its description", {
            finalize: function(div) {
                divCount += 1;
                div.css("color", themeColors.otherSkills[1]);
            }
        });
        for (var n = 0; n < allSkills.length; n++) {
            var color;
            if (allSkills[n].type == "webDev") {
                term.echo(allSkills[n].name, {
                    finalize: function(div) {
                        if (color == themeColors.otherSkills[0]) {
                            color = themeColors.otherSkills[1];
                        } else {
                            color = themeColors.otherSkills[0];
                        };
                        divCount += 1;
                        div.css("color", color);
                    }
                });
            };
        };
    },
    "help" : function(term) {
        //term echo callbacks happen after for loop is finished; n can't be used for indexing
        var divCount = 0;
        for (var n = 0; n < helpMessages.length; n++) {
            var color;
            term.echo(helpMessages[n].text, {
                finalize: function(div) {
                    if (color == themeColors.help[0]) {
                        color = themeColors.help[1];
                    } else {
                        color = themeColors.help[0];
                    };
                    divCount += 1;
                    div.css("color", color);
                }
            });
        };
    }
};

/*changes start */
$(window).on('scroll',function(){

    if(window.pageYOffset >= $('#section7').offset().top)
    {
/*changes start */
        $('#termi').terminal(function(command, term) {
            if (command !== '') {
                try {
                    if (command in customCommands){
                        customCommands[command](term);
                    } else {
                        isSkill = false;
                        for (var n = 0; n < allSkills.length; n++) {
                            if (command == allSkills[n].name) {
                                isSkill = allSkills[n].type;
                                term.echo(allSkills[n].description, {
                                    finalize: function(div) {
                                        var color = "#aaaaaa";
                                        if (isSkill == "coding") {
                                            color = themeColors.codingSkills[0];
                                        } else if (isSkill == "other") {
                                            color = themeColors.otherSkills[0];
                                        }else if (isSkill == "analytics") {
                                            color = themeColors.webDev[0];
                                        }else if (isSkill == "webDev") {
                                            color = themeColors.analytics[0];
                                        };
                                        div.css("color", color);
                                    }
                                });
                                break;
                            }
                        };

                        if (!isSkill){
                            term.echo("I am sorry! Manank has not added any skill like this. Please check your spelling or try again with 'help' command.", {
                                finalize: function(div) {
                                    var color;
                                    if (color == themeColors.help[0]) {
                                        color = themeColors.help[1];
                                    } else {
                                        color = themeColors.help[0];
                                    };
                                    div.css("color", color);
                                }
                            });
                        };
                    };
                } catch(e) {
                    term.error(new String(e));
                }
            } else {
               term.echo('');
            }
        }, {
            greetings: 'Greetings from the Bot of Manank. I can tell about his skills on behalf of him.\nType "help" to learn all my commands!\n',
            name: 'ManankBot',
            height: 400,
            prompt: 'ManankBot> '
        });
/*changes start */
    }     
});
/*changes end */


$( "body" ).on('DOMSubtreeModified', "span", function() {
    var color = "#aaaaaa";
    if ($(this).html() == "codingSkills"){
        color = themeColors.codingSkills[0];
    } else if ($(this).html() == "otherSkills"){
        color = themeColors.otherSkills[0];
    } else if ($(this).html() == "help"){
        color = themeColors.help[0];
    } else {
        var isSkill = false;
        for (var n = 0; n < allSkills.length; n++) {
            if ($(this).html() == allSkills[n].name) {
                isSkill = allSkills[n].type;
                break;
            };
        };
        if (isSkill == "coding") {
            color = themeColors.codingSkills[0];
        } else if (isSkill == "other") {
            color = themeColors.otherSkills[0];
        };
    };
    $(this).css("color", color);
});

var allSkills = [
    {
        name : "Python",
        description : "Python is my language of choice when not working with web apps. I make games, AI bots, Desktop Softwares and a lot more cool stuffs like that using python",
        type : "coding"
    },
    {
        name : "Javascript",
        description : "Javascript is my favorite language most of the time, because objects are SO MUCH FUN! I can do almost everything in web development using that",
        type : "coding"
    },
    {
        name : "Node",
        description : "I have experience with building RESTful backends with Node, as well as realtime amazon alexa apps. I made few Alexa bots to book a car or order food using node js.",
        type : "webDev"
    },
    {
        name : "Java",
        description : "I use Java for both desktop and web apps. I used jsp, jsf along with spring mvc to make advanced Learning portal.",
        type : "coding"
    },
    {
        name : "tableau",
        description : "I make dashboards and reports using tableau. ",
        type : "analytics"
    },
    {
        name : "obiee",
        description : "I make dashboards and reports using OBIEE 12C (cloud based) as well. ",
        type : "analytics"
    },
    {
        name : "phonegap",
        description : "I make cross platform mobile applications with phonegap.",
        type : "webDev"
    },
    {
        name : "ionic",
        description : "I make cross platform amobile apps using ionic ",
        type : "webDev"
    },
    {
        name : "aws",
        description : "I use aws to test, host and implement most of my developments including Alexa apps",
        type : "webDev"
    },
    {
        name : "JQuery",
        description : "JQuery is an extremely popular Javascript library for interacting with HTML page elements.",
        type : "webDev"
    },
    {
        name : "mongodb",
        description : "I use it with Spring MVC for nosql",
        type : "webDev"
    },
    {
        name : "D3.js",
        description : "D3.js is a Javascript tool for data visualization. I'm using it in a dashboard and report generations",
        type : "analytics"
    },
    {
        name : "git",
        description : "I always use version control. Always.",
        type : "coding"
    },
    {
        name : "Statistics",
        description : "Statistics has always come naturally to me.",
        type : "other"
    },
    {
        name : "Entrepreneurship",
        description : "I am founder at my own company - OrderOne. Where I worked with more than 40 clients across the globe in last year.",
        type : "other"
    }
];

var helpMessages = [
    {
        text : 'Nice ! So basically Manank has skills in area of coding, web development, analytics etc.\n'
    },
    {
        text : 'type "codingSkills" to see my coding-related skills'
    },
    {
        text : 'type "webDev" to see my other skills'
    },
    {
        text : 'type "analytics" to see my other skills'
    },
    {
        text : 'type "otherSkills" to see my other skills'
    },
    {
        text : 'type any skill from the list for its description'
    },
    {
        text : 'type "help" to see help again'
    }
];