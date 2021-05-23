
export function getMarkovAlgorithmProcessor(input, rules, maxStep) {
  function* algorithmProcessor(inputString, rules, maxStep = 100000) {
    let currentString = inputString;
    let ruleId = 0;
    let currentStep = 1;

    while (ruleId < rules.length) {
      if (currentStep > maxStep) {
        throw Error("Max steps reached");
      }

      let rule = rules[ruleId];

      if (currentString.indexOf(rule.originString) !== -1) {
        const processedString = currentString.replace(rule.originString, rule.targetString);

        yield {
          string: processedString,
          step: currentStep,
          currentRule: ruleId,
          success: true
        };

        currentString = processedString;
        ruleId = rule.successNext;

      } else {

        yield {
          string: currentString,
          step: currentStep,
          currentRule: ruleId,
          success: false
        };

        ruleId = rule.failNext;
      }

      currentStep += 1;
    }

    if (ruleId > rules.length) {
      throw Error(`Instruction ${ruleId} does no exist`);
    }

    if (ruleId === rules.length) {
      yield {
        string: currentString,
        step: currentStep,
        currentRule: ruleId
      }
    }
  }

  const processor = algorithmProcessor(input, rules, maxStep);
  let currentInterval = null;

  function runAlgorithm(shouldAdvance, onResult, onError, onFinish) {
    currentInterval = setInterval(runner, 1);

    function runner() {
      try {
        const advance = shouldAdvance();

        switch (advance) {
          case 'end':
            stopRunner();
            onFinish();
            break;

          case 'next':
            const output = processor.next();

            if (output.done) {
              stopRunner();
              onFinish();
            } else {
              onResult(output.value);
            }
            break;
          case 'wait':
          // fall through
          default:
            break;
        }
      } catch (e) {
        stopRunner();
        onError(e);
      }
    }
  }

  function stopRunner() {
    clearInterval(currentInterval);
  }

  return {
    run: runAlgorithm,
    stop: stopRunner,
  };
}
