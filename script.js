let btn = document.querySelector("#btn");
let content = document.querySelector("#cont");
let voice = document.querySelector("#voi");

function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
}

function wish() {
    let day = new Date();
    let hour = day.getHours();
    if (hour >= 0 && hour <= 12) {
        speak("Good morning");
    }
    else if (hour >= 12 && hour <= 16) {
        speak("Good afternoon");
    }
    else {
        speak("Good evening");
    }
}
// window.addEventListener('load', () => {
//     wish();
// }, { once: true });

function enableSpeechOnInteraction() {
    wish(); // Call the wish function
    document.removeEventListener('click', enableSpeechOnInteraction);
    document.removeEventListener('keydown', enableSpeechOnInteraction);
    document.removeEventListener('touchstart', enableSpeechOnInteraction);
}

// Listen for user interaction once
document.addEventListener('click', enableSpeechOnInteraction, { once: true });
document.addEventListener('keydown', enableSpeechOnInteraction, { once: true });
document.addEventListener('touchstart', enableSpeechOnInteraction, { once: true });

// Initialize Speech Recognition
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recog = new SpeechRecognition();

// Execute command when speech is recognized
recog.onresult = (event) => {
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;

    // Show the transcribed text
    content.innerText = transcript;

    // Convert to lowercase before processing
    takeCommand(transcript.toLowerCase());
};

// Start speech recognition on button click
btn.addEventListener("click", () => {
    recog.start();
    btn.style.display = "none";
    voice.style.display = "block";
}, { once: true });

// Function to handle commands
function takeCommand(msg) {
    btn.style.display = "flex";
    voice.style.display = "none";
    if (msg.includes("hello") || msg.includes("hey")) {
        speak("Hello, how are you?");
        
    } 
    else if (msg.includes("who are you")) {
        speak("I am a virtual assistant, created by Neha Bhati.");
        
    }
    else {
        // Check if the message contains a command to open a website
        const websiteOpened = openWebsite(msg);
    
        // If no website was opened, perform a Google search
        if (!websiteOpened) {
            speak(`This is what I found on the internet regarding ${msg}`);
            window.open(`https://www.google.com/search?q=${encodeURIComponent(msg)}`);
        }
    }

    // else if(msg.includes("open youtube")){
    //     speak("opening Youtube");
    //     window.open("https://www.youtube.com/")
    // }
    // else if(msg.includes("open instagram")){
    //     speak("opening instagram");
    //     window.open("https://www.instagram.com/")
    // }
    // else if(msg.includes("open whatsapp")){
    //     speak("opening whatsapp");
    //     window.open("https://www.whatsapp.com/")
    // }
    // else if(msg.includes("open google")){
    //     speak("opening google");
    //     window.open("https://www.google.com/")
    // }
    // else if(msg.includes("open facebook")){
    //     speak("opening facebook");
    //     window.open("https://www.facebook.com/")
    // }
}


// Function to open websites dynamically
function openWebsite(msg) {
    // Mapping of keywords to URLs
    let sites = {
        "open youtube": "https://www.youtube.com",
        "open google": "https://www.google.com",
        "open facebook": "https://www.facebook.com",
        "open twitter": "https://www.twitter.com",
        "open github": "https://github.com",
        "open chatgpt": "https://chat.openai.com",
        "open instagram": "https://www.instagram.com/",
        "open reddit": "https://www.reddit.com",
        "open whatsapp": "http://whatsapp.com/",
    };

    // Check if the message matches any key in the mapping
    for (let key in sites) {
        if (msg.includes(key)) {
            speak(`Opening ${key.replace("open ", "")}`);
            window.open(sites[key])[1].trim(); // Open the website in a new tab
            return;
        }
    }


    // If no match is found
    speak("Sorry, I don't know this command.");
    return false;
}

