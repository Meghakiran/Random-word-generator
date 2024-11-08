async function generateWord() {
    document.getElementById("word").innerText = "Loading...";
    document.getElementById("meaning").innerText = "";

    try {
        // Step 1: Fetch a list of random words from the Datamuse API
        const randomWordResponse = await fetch("https://api.datamuse.com/words?sp=*&max=1000");
        if (!randomWordResponse.ok) throw new Error("Failed to fetch random word list");

        const randomWordData = await randomWordResponse.json();
        // Choose a random word from the list
        const randomWord = randomWordData[Math.floor(Math.random() * randomWordData.length)].word;
        document.getElementById("word").innerText = randomWord;
        console.log("Random Word:", randomWord);

        // Step 2: Fetch the meaning of the word from the Free Dictionary API
        const dictionaryResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
        if (!dictionaryResponse.ok) throw new Error("Failed to fetch word definition");

        const dictionaryData = await dictionaryResponse.json();
        console.log("Dictionary Data:", dictionaryData);

        // Check if the dictionary returned data
        if (dictionaryData.length > 0 && dictionaryData[0].meanings.length > 0) {
            // Get definitions
            const definitions = dictionaryData[0].meanings[0].definitions;
            const definitionText = definitions.map(def => def.definition).join("; ");
            document.getElementById("meaning").innerText = definitionText || "No definition found.";
            console.log("Definition:", definitionText);
        } else {
            document.getElementById("meaning").innerText = "No definition found.";
        }
    } catch (error) {
        document.getElementById("meaning").innerText = "Error fetching data. Please try again.";
        console.error("Error:", error);
    }
}

function playSound() {
    const word = document.getElementById("word").innerText;
    if (word && word !== "Loading...") {
        // Use Web Speech API to speak the word
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    } else {
        alert("No word available to play.");
    }
}
