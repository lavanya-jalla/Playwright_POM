export const customerTestData = {
  name: 'Lavanya Jalla',
  gender: 'female',
  dob: '2004-05-02',
  address: 'Manchi Kanti Nagar',
  city: 'Khammam',
  state: 'Telangana',
  pin: '507003',
  mobile: '9002020200',
  password: '1234@',

  getEmail() {
    return `lavanya${Date.now()}@gmail.com`;
  }
};
export const customerInvalidTestData = {
  name: 'Lavanya Jalla',
  gender: 'female',
  dob: '2004-05-02',
  address: 'Manchi Kanti Nagar',
  city: 'Khammam',
  state: 'Telangana',
  pin: '50700',
  mobile: '9002020200',
  password: '1234@',

  getEmail() {
    return `lavanya${Date.now()}@gmail.com`;
  }
};