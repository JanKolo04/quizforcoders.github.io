(function(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // correct answers change color on lightgreen
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // incorrect answers change color on red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      // questions 1
      question: "Jaki jest najnowszy system operacyjny od firmy Microsoft ?",
      answers: {
        a: "Windows 10",
        b: "Windows 9",
        c: "Widnows 8"
      },
      correctAnswer: "a"
    },
    {
      // questions 2
      question: "Co to jest div ?",
      answers: {
        a: "Jest to pojemnik na informacje",
        b: "Miejscie gdzie linkujemy css",
        c: "Miejsce gdzie ustawaimy UTF-8"
      },
      correctAnswer: "a"
    },
    {
      // questions 3
      question: "Jakim poleceniem pokaże nam się teskt 'Hello' w Pythonie ?",
      answers: {
        a: "printf('Hello')",
        b: "print('Hello')",
        c: "println('Hello')"
      },
      correctAnswer: "b"
    },
    {
      // questions 4
      question: "Jak oznaczamy funkcje main w Pythonie ?",
      answers: {
        a: "class main():",
        b: "def main():",
        c: ".main{}"
      },
      correctAnswer: "b"
    },
    {
      // questions 5
      question: "Za pomoca jakiej komendy wyśrodkujemy tekst w css ?",
      answers: {
        a: "text-algin: center;",
        b: "position: absolute",
        c: "margin-top: 20%;"
      },
      correctAnswer: "a"
    },
    {
      // question 6
      question: "Kto Stworzył jądro Linux ?",
      answers: {
        a: "Bill Gates",
        b: "Steve Jobs",
        c: "Linus Torvalds"
      },
      correctAnswer: "c"
    },
    {
      // questions 7
      question: "Za co odpowiada SSH ?",
      answers: {
        a: "Jest to bezpieczne połączenie z serverem",
        b: "Za jego pomoca można wyrzucić pliki na server",
        c: "Zmieniamy hasło do servera"
      },
      correctAnswer: "a"
    },
    {
      // questions 8
      question: "Jaki jest obecnie najpopularniejszy język programowania ?",
      answers: {
        a: "Python",
        b: "C++",
        c: "Swift"
      },
      correctAnswer: "a"
    },
    {
      // question 9
      question: "Za co odpowiada Meta ?",
      answers: {
        a: "Do przekazywania informacji o stronie wyszukiwarce",
        b: "Do linkowania JS",
        c: "Do zmiany tła strony"
      },
      correctAnswer: "a"
    },
    {
      // question 10
      question: "Jak nazywa sie najnowsza wersja macOS ?",
      answers: {
        a: "Catalina",
        b: "BigSurr",
        c: "Debian"
      },
      correctAnswer: "b"
    }
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();

