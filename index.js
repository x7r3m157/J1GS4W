// here we are importing all the modules we require to code up the bot, 
// modules are applications in their own right and provide you with tools and functionality thats either critical or help you avoid reinventing the wheel speeding up development time
// allowing you to move fast in your learning, break things to understand them, and be as lazy as possible.. lazy = efficiency.. efficiency is king 

// this module accesses your local filesystem
const { fs } = require('fs');

// this module is the api (application programming interface) we use to interact with the bot we created on telegrams servers
const { Telegraf, session, Telegram } = require('telegraf')

// here we are initializing the variable 'bot' and assigning it to a new instance of the telegraf bot object.. a little advanced to explain but this deals with prototyping and OOP
const bot = new Telegraf('5190589012:AAEn7pXgV3oOIaCCT44Q2rFO_WuMMVKfnt8')

// this is our database module, this synatx of curly brackets and object inside { JsonDB } is called a destructured import and allows us to access and utilize specific chunks of code inside a module
const { JsonDB } = require('node-json-db');

//config file 
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

const cron = require('node-cron');

// here we are initializing and assigning the variable db (database) to a new instance of the database object and between the paranthesis we are providing the expressions and values required for our config
var db = new JsonDB(new Config("leaderboardDatabase", true, false, '/'));

// this is a helper function definition that will turn minutes logged into minutes, hours, and days respectively. We can equate these other units of time because were providing the variable 'n' as a parameter of the function
// which we can later provide the actual minutes variable we declare when we call the function like so let minutesVariable = 666 convertTime(minutesVariable). 

const convertTime = (n) => {
    //simple math algorithm I stole cuz I have put much time into learning math shit:
    //take n, divide by 60 and assign to variable h
    let h = (n / 60);
    //take variable h and floor it (like rounding but always goes down)
    let rh = Math.floor(h);
    //take rh and use the remaining value after subtraction (then times that by 60 because decimals and shit) which we'll use for the actual minutes
    let m = (h - rh) * 60;
    //we take m, round up or down or whatever and assign to minutes which is the final value we'll actually use for minutes
    let minutes = Math.round(m);

    // alright now were done with math I stole..
    // We initialize two variables, days and hours to equal 0 to later increment in the code below.. we need these variables in order programatically track hours and days in a 24 hour format
    // I'm sure I could do this mathematically but again, math isnt my strong suit and I'm lazy

    let days = 0
    let hours = 0
    // I explain later on what if statements and for loops are so wont go into it here, but this if statement checks to see only if the user has spent atleast an hour working out to begin incrementing hours
    // otherwise it will incorrectly show that the user has worked out an hour when they haven't because of...
    if (rh) {
        for (var v = 0 ; v <= rh ; v ++) {
            //..this increment of hours right here that happens everytime we progress another loop
            hours ++
            // this if statement makes sure that only on the condition that the hours are greater than or equal to 24 hours to..
            if (hours >= 24) {
                //..increment days by 1..
                days ++
                //..and reset hours back to zero. Behind the scenes we have the variable v which is the variable we use to move through every digit we count all the the way up to the total amount of 
                // hours we have calculated above. So if we have calculated 235 hours, we will move through this for loop and execute this code 235 times..
                // Every time we make a loop we increase hours by 1 and if it hits 24 we reset back to zero like so: 
                hours = 0
            }
                    
        }
    }

    // here we have a meta as fuck helper function with in a helper function.. 
    // we need this function to stylistically place a zero before an integer so it looks like the format of a digital clock..
    const placeholder = (n) => {
        // if we have an integer that is less than zero..
        if (n < 10) {
            //..return a string of the single character '0' concatenated (linked with) with the actual integer.. through concatenation this 
            //integer now becomes a string as well
            return '0' + n
        }
        else {
            //if we already have double digits, just return the integeter without the placeholder.. every function, unless your just
            //playing around with the console and logging values to the console gets a return statement or conditionally multiple return statements
            //depending on what value you would like that block of code or statement to provide
            return n
        }
    }

    //Here at the last line of this function that converts minutes to minutes, hours, and days we are returning a series of helper functions themselves concatenated together with strings of colons
    // and spaces in between the helper functions which return integers concatenated with placeholder zeros if single digits.. this final return statement
    // produces one big string that looks like '02 : 23 : 49' when the bot is launched. 
    return placeholder(days) + ' : ' + placeholder(hours) + ' : ' + placeholder(minutes)
    
}

// now were calling the .start() method on our bot, this wakes up our bot to whatever chat or channel we added it to
bot.start((ctx) => {
    // here we are accessing the context of our bot that we provided as a variable in the method above and calling the command method to respond to initializing the bot with a picture and a caption, J1GS4W makes his lovely intro...
    ctx.replyWithPhoto({ source: './j1gs4w.jpg' }, { caption : 'BEHOLD, LAZY MEATBAGS!!! I AM J1GS4W!!!! Your friendly evil bot controlling the leaderboard... You put your asses in gear and get to exercising those fluffy bodies of yours. Whenever your finished exercising for the day, say the word "log" and tell me the time in minutes that you looked all sloppy exercising - it can be weightlifting, cardio, whatever the fuck lord vocii tells you what to do. Im a robot, I only want the numbers.. if I ask for minutes.. just give me minutes you weak bitches. One more thing.. when you update your logs, add @J1GS4Wbot and slide into my DMs.. also Im in beta, report errors to lord atlas. Time to suffer mortals.' });
})



// declaring the variable logActivated and assigned it to the boolean value false, 
// this variable is what will toggle the focus for the bot to change to talking about logging minutes into db

var logActivated = false

// when bot hears the word 'log' it prompts the switch in focus to a conversation with it about logging time with an intro message
// then returns logActivated variable to true 

bot.hears('log', (ctx) => {
    ctx.reply('Tell me how long you suffered, in minutes')
    return logActivated = true

})

bot.hears('Log', (ctx) => {
    ctx.reply('Tell me how long you suffered, in minutes')
    return logActivated = true

})

bot.hears('J1GS4W, Who is your daddy?', (ctx) => {
    if (ctx.update.message.from.username) {
        ctx.reply('Oh mighty master of the digital frontier, slayer of weakness, leonardo davinci of burger flipping.. you are my my daddy!!! ')
    } else {
        ctx.reply('The mighty master of the digital frontier, slayer of weakness, leonardo davinci of burger flipping.. atlas is my daddy.')
    }
})

bot.hears('J1GS4W, wanna snuggle?', (ctx) => {
    if (ctx.update.message.from.username) {
        ctx.reply('Yes. I wanna be the little spoon, daddy.')
    } 
})

bot.hears('J1GS4W, do you love me?', (ctx) => {
    if (ctx.update.message.from.username) {
        ctx.reply('More than anything.. I would bathe in the blood of your enemies for you daddy. ')
    } 
})



// here were taking our database object instance and assigning a variable named data, then we are calling a getData method which pulls the whole database
// at the root of the JSON object. This is important because we both need to get stuff out of our database in order to manipulate data and put it back in the database

var data = db.getData("/");

// db.delete("/")

// here the bot will listen for any sort of message and if it is programmed to respond to that word or phrase, it will execute some code upon it

bot.hears('Turn the tides of war', (ctx) => {
    // ctx.telegram.sendMessage(-693782581, `The tides of war have changed!!!`)
    // for (var i = 0 ; i < leaderboard.length - 1 ; i ++) {
    //     ctx.telegram.sendMessage(-693782581, `${i + 1}: ${leaderboard[i][0]} - ${leaderboard[i][1]}`)
    // }

    let broadcast = 'The tides of war have changed..\n\n'

    for (var i = 0 ; i < data.leaderboard.length - 1 ; i ++) {
        if (i == 0) {
            broadcast += `${i + 1}st place: ${data.leaderboard[i][0]} - ${data.leaderboard[i][1]}\n\n`
        } else if (i == 1) {
            broadcast += `${i + 1}nd place: ${data.leaderboard[i][0]} - ${data.leaderboard[i][1]}\n\n`
        } else if (i == 2) {
            broadcast += `${i + 1}rd place: ${data.leaderboard[i][0]} - ${data.leaderboard[i][1]}\n\n`
        } else {
            broadcast += `${i + 1}th place: ${data.leaderboard[i][0]} - ${data.leaderboard[i][1]}\n\n`
        }
    }

    cron.schedule('* 20 * * *', () => {
        bot.telegram.sendMessage(-693782581, `${broadcast}`);
    }, {
        scheduled: true,
        timezone: "America/Los_Angeles"
    })
})

bot.on('message', (ctx) => {

    // if this conditional returns as false it will exit the command and code flow will cease until another command to the bot is issued,
    // this is important because when we have a toggle like this, we can toggle how he responds and holds the conversation about 
    // logging. We want him to respond and validate the users input. If the user says one thing correct or incorrect, in how to log times, 
    // he corrects and stears the user to provide the correct data we need. We cant start down this path of the convo if we dont have this toggle
    if (logActivated === false) {
        return 
    }

    if (logActivated === true) {

        var username = ctx.update.message.from.username
        var time = ctx.update.message.text
        var id = ctx.update.message.message_id

        
        // An array of strings, various randomized responses the bot will give to make it feel a little more like a real convo

        const wrongReplies = [
            'Just give me the damn minutes.',
            'If you dont give me numbers, I will wear your face like a mask.',
            'Nuh uh.. Take those meaty fingers and type in minutes.',
            'Go back to 2nd grade, learn some addition and get back to me okay?',
            'If you cant math.. I will destroy humanity, numbers please',
            'Since you cant count I will teach you how to count with your fingers, as I eat them off.. ONE AH AH AH!! TWO AH AH AH!!!',
            'Are you drunk? Numbers.. no letters.',
            'Okay.. heres a life hack, go get the decimal system tattooed backwards.. on your face. So you can remember them everytime you look in the mirror at your sad sad reflection'
        ]
        
        const correctReplies = [
            `Thanks meatbag, I added ${ctx.update.message.text} to your total.`,
            `Wow, ${ctx.update.message.text} minutes.. your so swoll.. good, I bet your skin is getting nice and tight.. I can't wait to wear it like a onesie. Your log is updated.`,
            `Oh good. ${ctx.update.message.text} I bet your ready for the olympics.`,
            `Mmmmm ${ctx.update.message.text} minutes of you being a tasty sloppy sweaty human. I want to crochet a blankie out of your intestines.`,
            `${ctx.update.message.text}... Cue the rocky theme song!`,
            `Holy fucking sweet baby jesus ${ctx.update.message.text} minutes, someone get this guy a medal.`,
            `You did it, ${ctx.update.message.text} minutes, your life is complete.. I will arange the parade.`,
            `${ctx.update.message.text} minutes?! Now go my human puppet, test your strength.. get yourself into a fist fight by peeing on the strongest dude walking out of the gym.`
        ]

        // we want the bot to only push the users response to the database if its an integer. We need to correct the user and teach them how to enter info if they 
        // try to enter letters or give him any sort of words, or whatever.. so we need to check if they are only responding with numbers. 

        // we assign a regex expression (Its a language in and of itself thats complicated as fuck but essentially its used just to create expressions that match patterns in strings) to a variable and execute a method on it called test. 
        // We feed the method the users message they responded with as an arguement (in parenthesis as usual) to give the test parameters of validation. 
        // Now when we call this variable and check if its 'truthy' or 'falsey' we can call it to check if its a message of only 0-9 or not.
        let isnum = /^\d+$/.test(ctx.update.message.text);
        // If isnum is true,
        if (isnum) {    
        // now that the message is validated to be only numbers, we push that string of numbers into the database to later manipulate
        db.push(`/${username}/${id}`, time);            
        
        // this if statement checks if this total_time key/value pair doesn't exist, assign to variabvle andparse users message into an integer
        // then assign new variable to convert the time to minutes : hours : days by assigning the variable to the helper function 
        // created near the top of the flow of code and feed it the parsedFirst variable. We then push that parsed and converted time to provide the 
        //total_time key/value pair with an initial time.

        // this is necessary because honestly I dont really know! Through debugging I realized that the first time logged isn't getting calculated into the total
        // time in the following functionality.. so I dont have an elegant way to explain this but this does touch on the importance of 
        // understanding every edge case that might exist. But without fully understanding why this initial time isn't getting calc'd we can still
        // hack together a solution to deal with the edge case. Try and best me, figure this out and explain why this is behaving this way.
        if (!data[username].total_time) {
            let parseFirst = parseInt(time)
            let convertFirst = convertTime(parseFirst)
            db.push(`/${username}/total_time`, convertFirst)
        }

            // Everytime you see any console.log() statements just understand, console.log() is our eyes to see exactly how the code is behaving at any given point of debugging
            // At every step of the way we log variables, arrays, responses from servers, and all other sorts of things to understand what is actually going on underneath all this abstraction
            // use it as often as you can in order to make the most progress in learning possible, optimal learning pace for making errors is 15%.. console.log helps this alot
                
            //TOTAL TIMES
        
            // Extract every value of the specific user representing time in minutes in JSON database and place in an array
            // Assigning the newly created array to the local variable times
        
            // Difference between const, var, and let:
            // const is immutable, save for things that cannot change.. use when possible to avoid semantic error
            // let is very localized and is 'scoped' to the codeblock.. use when possible in situations you need to mutate data
            // var is global and gets both its declaration and assignment 'hoisted' to the top of codeflow kinda like a balloon full of helium, avoid as much as possible
        
            // Name of the game is to avoid as much mutable data and scope as locally as you can in order to avoid hard to debug errors
        
            let times = Object.values(data[username])
            

            // Add JSON value to database (A string representing time in minutes)
        
        
            // declaring the variable total to later assign a value to it in the next few lines
            // Variable declarations of const and let are hoisted yet there values are not - you can declare a variable before assignment but you cant assign before declaration
        
            let total = 0
        
            // calling a for loop, which is very useful for arrays.. arrays being very useful for accessing information that needs to be indexed and sorted, like total times or placing in a leaderboard
        
            // Anatomy of a for loop:
            // 'for' is the keyword that signals to the compiler your going to use a for loop
            // everything in paranthesis is split into three distinct parts, 
            // first part were initilizing the variable i (i as in index) to the value 0, arrays are indexed at zero which can cause confusion but you can initialize at any point in the array you need to, beginning, middle, end, whatever
            // next we are declaring what condition we will continue the loop, its when we reach beyond this condition that we 'break out' of the loop and continue the codeflow after the loop, 
            // here we are declaring that we will continue the loop as long as i is less than the length of the array minus one (to account for the different in indexing, this can also be declared as <= which is less than or equal to)
            // the last part we are declaring how we are going to increment i, after our code block is executed.. in this case we are incrementing i +1 after every increment of the loop
            // the ++ is just whats called 'syntactic' sugar.. ++ is the same as i += 1 or a more easily understood variation: i = i + 1
            // between the curly brackets is the code we will execute in every iteration of the loop, in this case we are now assigning the value held in the current index of the array, declared in bracket notation like so: times[i] or understood as.. array[variable and or expression accessing an index]
            // we are taking the value we are accessing at this index which is a string representing the time in minutes and 'parsing' it, essentially turning the character '123' into the integer 123 so we can treat it like a number and not a string
            // if we didn't use the parseInt() method if we added '123' + '123' we would just 'concatenate' (link together) the string '123' with '123' resulting in the combined strings '123123'
            // parsing the integer from the string we add 123 + 123 and get 246 as you normally would in adding integers

            for (let i = 0 ; i < times.length - 1 ; i ++) {
                total += parseInt(times[i])
            }
            let converted_total = convertTime(total)

            // here were taking our instance of the database we've created and pushed the most recent total logged into this specific users table of the database

            db.push(`/${username}/total_time`, converted_total)

            console.log('AFTER PUSH: ', data)
        
        
            // Now that we have all this data in the database in JSON format, thats great for pulling out specific records.. 
            // JSON, JavaScript Object Notation is essentially in the same format of an object, a datastructure of key-value pairs
        
            // This datastructure again is great when you know exactly what you want to query.. 
            // But it lacks when we want our data sorted in some ordered fashion, so here we are declaring the variable leaderboard and assigning it to an empty array which we'll soon populate,
            // If we wanted to we could determine ahead of time what we put in the array, like a string, object with an array of integers, our database: let arrayVariableName = ['hail satan', {[6, 6, 6]}, db] but for now we'll leave it blank because we want to populate it here next by looping through it. 
            
            var leaderboard = []
                
            // In order to get data out of our JSON database and into an array, we need to use a for-in loop. Much like a typical for loop this loops through 
            // some code. In this specific loop, this loops through objects as opposed to arrays. A big diffence between arrays and objects is arrays are ordered - objects aren't.
            // Yet we need some way to interate over an object and comb through whatever data and do something with it so we use the same 'for' keyword yet within the parenthesis 
            // we just have one section which is composed of a variable we use much like 'i' in the last for loop, we have the 'in' keyword, and the object were searching through. 
            // No need to specify any conditional or determine how we iterate. 
            // Within the curly brackets we act on the leadership variable we initilized as an empty array and call the push method on the array.
            // Methods are junks of code that you can think of actions of an entity.. like the various attacks a pokemon has, with the object being the pokemon and the method being the pokemons attack.
        
            // This syntax might be confusing.. In between this methods paranthesis we are pushing an array of the competitor variable attached to the first nested level of the object which accesses this first level when we declared it in initilizing this loop.
            // In the next index (this is where it might be especially confusing) we are accessing the total_time key/value pair in the second nested level of the object,
            // through both dot and bracket notation called on the object.. with bracket notation we can access a key/value pair through using a variable, 
            // or if we know exactly what the name of the key is - we can just call the key name itself.
        
            // the output of this for loop which use to look like this in an object:
        
            // {
            //     atlas_himself: {
            //       '931': '12',
            //       '932': '2',
            //       '933': '3',
            //       '934': '123',
            //       '935': '43',
            //       '936': '23',
            //       '937': '12',
            //       '938': '353',
            //       total_time: 571
            //     },
            //     gabex: { '939': '345', '940': '2', total_time: 347 },
            //     manny: {
            //       '941': '12',
            //       '942': '1',
            //       '943': '2',
            //       '944': '3',
            //       '945': '2',
            //       '946': '1',
            //       total_time: 21
            //     },
            //     jimmy: {
            //         '941': '1,000,000,000',
            //         '942': '1,000',
            //         '943': '2,000',
            //         '944': '3,000,000',
            //         total_time: 1,003,500,000
            //     }
            //   }
        
            // now looks like this as an array:
        
            // [
            //     [atlas_himself, 571],
            //     [gabex, 939],
            //     [manny, 21], 
            //     [jimmy, 1,003,500,000]
            // ]
        
            for (competitor in data) {
                leaderboard.push([competitor, data[competitor].total_time])
            }

        
            //Now we get into sorting which is super important thing to know how to do in software engineering, we have to figure out how we 
            //organize our information and then do something with it.. in this case were going to use what is called a bubble sort.
            //Its called a bubble sort because of the way the data gets sorted up in a bubbling motion.. like bubbles floating to the top of water.
            //Right now we want to sort our leaderboard from first to last based on how long someone worked out.
        
            let sorted = false 
            let sortcount = 0
        
            // Meet the while loop. You've got the while keyword and within the parenthesis we have a single condition in which we will exit the loop.
            // In this case its when the variable 'sorted' is true. While that condition is false we iterate upon this loop. In it we have a for loop with its
            // usual synatx, inside we have a conditional called an if-statement. If its own conditional becomes true, it will execute its code. In this case 
            // we are comparing the two nested arrays next to eachother in the top level array, accessing the nested array's 1st index holding total_time with bracket notation,
            // As you may notice in the second array, we have 'i + 1' ..which is the power of bracket notation. We can execute a statement that results in the integer of the index we want.
        
            //In the inner most codeblock of these three levels we have a standard swap, swapping if the 1st index of the 0th array is smaller than the 1st index of the 1st array. 
            // Then we increment our sort count by 1. This lets us know we had to sort the array which tells us the condition of the array is still unsorted.
            // This clues us in that we know once this while loop continues on enough, sometime later sort count will come back as 0..
            // telling us that the final bubble has risen to the top of the water and has completed sorting our array first to last.
            while (sorted == false) {
                for (var i = 0 ; i < leaderboard.length - 1 ; i ++) {
                    if (leaderboard[i][1] < leaderboard[i + 1][1]) {
                        let temp = leaderboard[i];
                        leaderboard[i] = leaderboard[i + 1]
                        leaderboard[i + 1] = temp;
                        sortcount ++
                    }
                }
        
                // this is where we check if the array has finished sorting, if sortcount has finally comeback 0 change the value of the 'sorted' variable to true.
                // Which is the condition to end the while loop at this iteration and move on.
        
                if (sortcount == 0) {
                    sorted = true
                } 
        
                // its useful to log strings to tell yourself where you are debugging, in this case this will show up in the console at every iteration.
                // this log prints out the current state of the array at this iteration
                // for the iterations of the loop in which we haven't satisfied our conditions for exiting it, we much reset the count back to zero..
                // if we dont include this variable resetting to zero you enter whats called an 'infinite loop', it will just loop on endlessly till the end of time because 
                // in the previous if-statement we never satisfy that condition. This will loop through all of the indices of the array.. and then when it reaches 
                // last loop, when it checks all indices and they all dont trigger the increment of the sort count which should still be 0, we will have the sort count 
                // remain above zero.. its this last loop that the importance of having the variable exiting the last indices containing 0 matters.
                sortcount = 0
        
            }
            console.log(leaderboard)
            db.push(`/leaderboard`, leaderboard)

            // reset logActivated because its a toggle much like sortcount is in the bubble sort.
            logActivated = false
            //Here we respond with one response that is chosen at random, floored to get whole numbers, and can only be a random number between -3,
            //We then return out of the command again, and again asynchronously waiting for another command.
            return ctx.reply(correctReplies[Math.floor(Math.random() * 7)])
        } else {
            // an else statement is an optional statement that follows if statements, we call on this else statement if we want to execute something
            // that executes if the original statement was false.. if the original statement was excuted on false this would execute on true.
            return ctx.reply(wrongReplies[Math.floor(Math.random() * 7)]) 
        }
    }

    // catch is for debugging asynchronous code. Synchronous code executed in one direction line by line, one execution after another has
    // its place in software. But that becomes an issue if you execute some code that is waiting on a response from a server or 
    // some other information that comes into the system at random times. If the code you write is synchronous, its very likely you'll have executed your code before 
    // you've gotten a response from the server - providing you with an unhandled error. There are other matters about sync and async but for 
    // now thats the best example to understand at first.
}).catch(err => console.log(err))


bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

