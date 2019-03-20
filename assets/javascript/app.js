var triviaGame = {

    questions: [
        {
            question: "Who is Michael Scott's enemy in the local office?",
            answers: ["Toby", "Dwight", "Jim", "Kevin"]
        },

        {
            question: "In  what city is the main setting for the show?",
            answers: ["Scranton, PA", "Stamford, CT", "Utica, NY", "Nashua, NH"]
        }],

    shuffle: function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    },

    intervalID: 0,
    questionTime: 5,
    remain: 0,
    correct: 0,
    incorrect: 0,
    skipped: 0,
    gameLength: 2,
    index: 0,

    countdown: function () {

        this.remain = this.questionTime;
        // console.log(remain);
        // console.log(this.remain);
        var intervalID = setInterval(function () {
            console.log(triviaGame.remain);
            triviaGame.remain--;
            if (triviaGame.remain === 0) {
                console.log("We hit ZERO!!!");
                clearInterval(intervalID);
                $("#game-area").empty();
                triviaGame.skipped++;
                // console.log(triviaGame.skipped);

                $("#game-area").append("<h2 class='skipped'>You're out of time!<h2>");
                triviaGame.index++;
                setTimeout(triviaGame.playGame, 3000);
            }
            $("#timer").html(triviaGame.remain + " seconds remaining.");

        }, 1000);

    },

    // count: function () {
    //     console.log(triviaGame.remain);
    //     triviaGame.remain--;
    //     $("#timer").html(triviaGame.remain + " seconds remaining.");
    // },

    newGame: function () {

        this.correct = 0;
        this.incorrect = 0;
        this.skipped = 0;
        this.index = 0;
        // var gameBoard = $("<div>");
        // gameBoard.addClass("row justify-content-center");
        this.shuffle(this.questions);
    },

    playGame: function () {

        $("#game-area").empty();
        var i = triviaGame.index;
        console.log("i = " + i);
        if (i === triviaGame.questions.length) {
            triviaGame.endGame()
        };
        var timer = $("<h2>");
        timer.attr("id", "timer");
        var questionText = $("<h2>");
        var answersDisp = $("<div>");
        var correctAns = triviaGame.questions[i].answers[0];
        var answersArr = triviaGame.shuffle(triviaGame.questions[i].answers);

        questionText.html(triviaGame.questions[i].question);
        questionText.addClass("col-12");
        console.log(questionText);


        for (i = 0; i < answersArr.length; i++) {
            console.log(answersArr[i]);
            var answerItem = $("<button>");
            answerItem.addClass("answer-button");
            answerItem.html(answersArr[i]);
            answersDisp.append(answerItem);
            answersDisp.append("<br>");

            // radio button input code.  Input doesn't have a close tag so the normal jQuery method wasn't working
            // answersDisp.append("<input type='radio' class='answer-button'> " + answersArr[i] + "<br>");
        }

        $("#game-area").append(timer);
        $("#game-area").append(questionText);
        $("#game-area").append(answersDisp);

        triviaGame.countdown();

        $(document).on("click", ".answer-button", function () {
            console.log(this.innerHTML);
            $("#game-area").empty();
            if (this.innerHTML === correctAns) {
                triviaGame.correct++;
                $("#game-area").append("<h2 class='correctly-answered'>That's what she said!<h2>");

                triviaGame.index++;
                setTimeout(triviaGame.playGame, 3000);
            }
            else {
                triviaGame.incorrect++;
                $("#game-area").append("<h2 class='incorrectly-answered'>False!<h2>");

                triviaGame.index++;
                setTimeout(triviaGame.playGame, 3000);
            }

        });
    },

    endGame: function() {
        var endTitle = $("<h2>");
        var corDisp = $("<div>");
        var incDisp = $("<div>");
        var skiDisp = $("<div>");
        (corDisp, incDisp, skiDisp).addClass("results col-12");

        corDisp.append("Correct:  " + triviaGame.correct);
        corDisp.append("Inorrect:  " + triviaGame.incorrect);
        corDisp.append("Skipped:  " + triviaGame.skipped);

        $("#game-area").append(endTitle);
        $("#game-area").append(corDisp);
        $("#game-area").append(incDisp);
        $("#game-area").append(skiDisp);

    }
}



$(document).ready(function () {

    $(document).on("click", "#start", function () {

        $("#game-area").empty();
        triviaGame.newGame();
        triviaGame.playGame();

    });

    if (triviaGame.remain < 0) {
        $("#game-area").empty();
        skipped++;
        $("#game-area").append("<h2 class='skipped'>You're out of time!<h2>");
    }

})