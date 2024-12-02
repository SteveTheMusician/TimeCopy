function checkInputField() {
    const inputElement = document.getElementById('test');
    let timeElapsed = 0;
    const checkInterval = 1000; // Überprüfung jede Sekunde
    const timeout = 10000; // Maximale Zeit von 10 Sekunden
  
    // Erste Überprüfung: Ist das Textfeld leer?
    if (inputElement.value.trim() === "") {
      alert("ok");
      return;
    }
  
    // Wenn das Textfeld nicht leer ist, starten wir die Überwachung
    const intervalId = setInterval(() => {
      timeElapsed += checkInterval;
  
      // Prüfen, ob das Textfeld jetzt leer ist
      if (inputElement.value.trim() === "") {
        clearInterval(intervalId); // Intervall stoppen
        alert("ok");
      }
  
      // Überprüfen, ob die maximale Zeit überschritten wurde
      if (timeElapsed >= timeout) {
        clearInterval(intervalId); // Intervall stoppen
        alert("fehler");
      }
    }, checkInterval);
  }
  
  // Start der Überprüfung
  checkInputField();