const STICK_DEADZONE = 0.18;

function deadzone(value) {
  const magnitude = Math.abs(value);
  if (magnitude <= STICK_DEADZONE) return 0;
  return Math.sign(value) * ((magnitude - STICK_DEADZONE) / (1 - STICK_DEADZONE));
}

export function createGamepadInput(onDetected = () => {}) {
  let activeIndex = null;
  let previousButtons = [];

  function findStandardGamepad() {
    return Array.from(navigator.getGamepads?.() || [])
      .find((gamepad) => gamepad?.connected && gamepad.mapping === "standard") || null;
  }

  function update() {
    const gamepad = findStandardGamepad();
    const nextIndex = gamepad?.index ?? null;

    if (nextIndex !== activeIndex) {
      activeIndex = nextIndex;
      previousButtons = [];
      onDetected(Boolean(gamepad));
    }

    if (!gamepad) {
      return {
        moveX: 0,
        moveY: 0,
        lookX: 0,
        lookY: 0,
        jumpPressed: false,
        interactPressed: false,
        scanPressed: false,
      };
    }

    const pressed = gamepad.buttons.map((button) => button.pressed);
    const justPressed = (index) => Boolean(pressed[index] && !previousButtons[index]);
    const input = {
      moveX: deadzone(gamepad.axes[0] || 0),
      moveY: deadzone(gamepad.axes[1] || 0),
      lookX: deadzone(gamepad.axes[2] || 0),
      lookY: deadzone(gamepad.axes[3] || 0),
      jumpPressed: justPressed(0),
      interactPressed: justPressed(2),
      scanPressed: justPressed(3),
    };

    previousButtons = pressed;
    return input;
  }

  return { update };
}
