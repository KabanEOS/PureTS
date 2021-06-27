class StatApp {
  containerDOMElement: Element;

  constructor(containerDOMElement: Element) {
    if (!containerDOMElement) {
      throw new Error("Musisz wprowadzić wartości");
    }
    this.containerDOMElement = containerDOMElement;
    this.startApp();
  }

  startApp(): void {
    this.assignListenerNumberInput();
    this.assignListenerInputGenerator();
  }

  assignListenerNumberInput(): void {
    let elements = this.containerDOMElement.querySelectorAll("input");
    let deleteButtons = this.containerDOMElement.querySelectorAll("button");

    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener("input", () => this.refreshData());
      deleteButtons[i].addEventListener("click", (e) => this.deleteSib(e));
    }
  }

  deleteSib(e): void {
    e.currentTarget.parentNode.remove();
  }

  assignListenerInputGenerator(): void {
    console.log(document.getElementById("addButton"));
    document
      .getElementById("addButton")
      .addEventListener("click", () => this.generateInput());
  }

  generateInput(): void {
    let numberOfButtons: number = +document
      .getElementById("inputNumber")
      .querySelector("input").value;
    console.log(document.getElementById("inputNumber"));
    console.log("created " + numberOfButtons);
    for (let i = 0; i < numberOfButtons; i++) {
      let createDiv = document.createElement("div");
      let createInput = document.createElement("input");
      createInput.type = "number";
      createInput.addEventListener("input", () => this.refreshData());
      let createButton = document.createElement("button");
      createButton.textContent = "Usuń";
      createButton.addEventListener("click", (e) => this.deleteSib(e));
      createDiv.appendChild(createInput);
      createDiv.appendChild(createButton);

      this.containerDOMElement.appendChild(createDiv);
    }
  }
  getInputsAndValues(): Array<number> {
    let elements = this.containerDOMElement.querySelectorAll("input");
    if (!elements) {
      throw new Error("Brak inputów");
    }
    console.log(elements);
    const numberArray: Array<number> = [];
    for (let i = 0; i < elements.length; i++) {
      let value: number = +elements[i].value;
      numberArray.push(value);
    }
    return numberArray;
  }

  refreshData(): void {
    let numbers = this.getInputsAndValues();

    const sum = this.sumFunction(numbers);
    const avg = this.avgFunction(numbers);
    const max = Math.max(...numbers);
    const min = Math.min(...numbers);

    this.assignData(sum, avg, max, min);
  }

  assignData(sum: number, avg: number, max: number, min: number): void {
    document.getElementById("sum").textContent = sum.toString();
    document.getElementById("avg").textContent = avg.toString();
    document.getElementById("min").textContent = min.toString();
    document.getElementById("max").textContent = max.toString();
  }

  sumFunction(numbersArray: Array<number>): number {
    let sum = 0;
    numbersArray.forEach((element) => {
      sum += element;
    });
    return sum;
  }

  avgFunction(numbersArray: Array<number>) {
    return this.sumFunction(numbersArray) / numbersArray.length;
  }
}

const statApp = new StatApp(document.querySelector("#startApp"));