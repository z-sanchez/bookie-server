import { SOMETHING_TO_PRINT } from "../../utils/constants.js";

export class TestModel {
  printSomething() {
    console.log({ somethingToPrint: SOMETHING_TO_PRINT });
  }

  printSomethingElse() {
    console.log({ somethingToPrint: "Something else" });
  }
}
