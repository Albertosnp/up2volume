export function isValidateEmail(email) {
    // eslint-disable-next-line no-useless-escape
    const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const alternativa = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailValidation.test(String(email).toLowerCase());
}
  