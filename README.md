# ProtocolONE PayOne Payment Form
[![Build Status](https://api.travis-ci.org/ProtocolONE/payone-js-payment-form.svg?branch=master)](https://travis-ci.org/ProtocolONE/token_one)
[![codecov](https://codecov.io/gh/ProtocolONE/payone-js-payment-form/branch/master/graph/badge.svg)](https://codecov.io/gh/ProtocolONE/payone-js-payment-form)

## Usage

### In development
You can use the package in pair with `payone-js-sdk`.
With `npm run serve` the form will be accessable in `payone-js-sdk` in development mode.

### In production
Define mounting place with id `p1payone-form` and initial data before attaching the form script
```html
<div id="p1payone-form"></div>
<script>
// Required
window.P1PAYONE_FORM_DATA = {
  id: '5c20e',
  has_vat: true,
  has_user_commission: true,
  project: { ... },
  payment_methods: [ ... ]
}
// Those are optional. Below defined values are default.
window.P1PAYONE_API_URL = 'https://p1payapi.tst.protocol.one';
window.P1PAYONE_WEBSOCKET_URL = 'wss://cf.tst.protocol.one/connection/websocket';
</script>
<script src="https://static.protocol.one/payone/form/latest/p1payone-form.js"></script>
```

### Library URLs
#### Hub with navigation
https://static.protocol.one/minio/payone/

#### Dev version
https://static.protocol.one/payone/form/dev/p1payone-form.js
Updates automatically with `master` branch updates

#### By release
https://static.protocol.one/payone/form/latest/p1payone-form.js
https://static.protocol.one/payone/form/v1.0.9/p1payone-form.js
Updates width actual version releases (`v*` tag pushed into repo)

## Development

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies into single js-file
```
npm run build
```

### Like `run build` but with dist file size analysis
```
npm run check-size
```

### Run tests
```
npm run test
```

### Run tests for development in watch mode 
```
npm run test:dev
```
