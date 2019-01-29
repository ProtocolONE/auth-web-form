module.exports = {
  root: true,
  extends: [
    'stylelint-config-standard',
  ],
  rules: {
    'at-rule-no-unknown': [true, {
      ignoreAtRules: [
        'include',
        'mixin',
        'if',
      ],
    }],
  },
};
