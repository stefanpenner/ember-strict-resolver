/* eslint-env node */
module.exports = {
  "scenarios": [
    {
      "name": "default",
      "bower": {
        "dependencies": {}
      }
    },
    {
      "name": "ember-beta",
      "allowedToFail": true,
      "bower": {
        "dependencies": {
          "ember": "components/ember#beta"
        },
        "resolutions": {
          "ember": "beta"
        }
      }
    },
    {
      "name": "ember-canary",
      "allowedToFail": true,
      "bower": {
        "dependencies": {
          "ember": "components/ember#canary"
        },
        "resolutions": {
          "ember": "canary"
        }
      }
    },
    {
      "name": "ember-2.13.3",
      "bower": {
        "dependencies": {
          "ember": "2.13.3"
        }
      }
    },
    {
      "name": "ember-2.12.2",
      "bower": {
        "dependencies": {
          "ember": "2.12.2"
        }
      }
    },
    {
      "name": "ember-2.11.3",
      "bower": {
        "dependencies": {
          "ember": "2.11.3"
        }
      }
    },
    {
      "name": "ember-2.10.2",
      "bower": {
        "dependencies": {
          "ember": "2.10.2"
        }
      }
    }
  ]
};
