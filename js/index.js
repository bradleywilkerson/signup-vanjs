let state = {
  user: {
    value: '',
    error: false,
    ok: false
  },
  pass: {
    value: '',
    error: 'passwords must be at least 6 characters long',
    ok: false
  },
  confirm: {
    value: '',
    error: false,
    ok: false
  },
  showingPass: false
}

const greenBorder = '#4caf50';
const redBorder = '#d26c6c'

const raiseErrorOrConfirm = (errType) => () => {
  const err = state[errType].error;
  const errorHolder = document.getElementById(errType + '-error');
  if (err !== false) {
    state[errType].ok = false
    errorHolder.innerText = err;
    setOk(errType, false);
  } else {
    state[errType].ok = true
    errorHolder.innerText = '';
    setOk(errType, true);
  }
}

const handlePass = () => {
  const entry = document.getElementsByClassName('pass')[0].value

  state.pass.value = entry;

  if (state.pass.value.length < 6) {
    state.pass.error = 'passwords must be at least 6 characters long';
  } else if (state.pass.value.indexOf(' ') > -1) {
    state.pass.error = 'passwords may not contain spaces'
  } else {
    state.pass.error = false;
  }

  raiseErrorOrConfirm('pass')()
}

const handleConfirm = () => {
  const entry = document.getElementsByClassName('confirm')[0].value

  state.confirm.value = entry;

  if (state.pass.value !== state.confirm.value) {
    state.confirm.error = 'does not match';
  } else if (state.confirm.value.length < 6) {
    state.confirm.error = '';
  } else {
    state.confirm.error = false;
  }

  raiseErrorOrConfirm('confirm')()
}

const handleUser = () => {
  const entry = document.getElementsByClassName('user')[0].value

  state.user.value = entry;

  if (state.user.value.length < 3) {
    state.user.error = 'usernames must be at least 3 characters long';
  } else if (state.user.value.indexOf(' ') > -1) { 
    state.user.error = 'usernames may not contain spaces'
  } else {
    state.user.error = false;
  }

  raiseErrorOrConfirm('user')()
}

const togglePassVisibility = (event) => {
  event.preventDefault();
  const button = document.getElementsByClassName('toggle-vis')[0];
  const els = document.getElementsByClassName('pass-input');
  const inputType = state.showingPass ? 'password' : 'text';
  const buttonText = state.showingPass ? 'show password' : 'hide password';
  for (let i = 0; i < els.length; i++) {
    els[i].type = inputType;
  }
  button.innerText = buttonText;
  state.showingPass = !state.showingPass;
}

const addListeners = () => {
  document.getElementsByClassName('user')[0].onkeyup = handleUser;
  document.getElementsByClassName('pass')[0].onkeyup = handlePass;
  document.getElementsByClassName('confirm')[0].onkeyup = handleConfirm;
  document.getElementsByClassName('toggle-vis')[0].onclick = togglePassVisibility;
  document.getElementById('submit').onclick = submitForm;
}

const submitForm = () => {
  let ok = true;
  Object.keys(state).forEach(key => {
    if (state[key].ok === false) {
      ok = false;
    }
  })
  if (ok) {
    showSuccess();
  }
}

const setOk = (errType, isOk) => {
  const el = document.getElementsByClassName(errType)[0];
  const color = isOk ? greenBorder : redBorder;
  el.style.borderColor = color;
}

const showSuccess = () => {
  const formEls = document.getElementsByClassName('form-container')[0];
  const title = document.getElementById('title');
  const height = title.offsetHeight;
  const userName = document.getElementById('user-finished');
  userName.innerText = ', ' + state.user.value;
  formEls.style.opacity = 0;
  title.style.marginTop = 'calc(50vh - ' + height + 'px)';
}


addListeners();
