import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  Label
} from '@blueprintjs/core'

storiesOf('Component', module)
  .add('with text', () => (
    <Label
      text="Username"
      helperText="(blah blah)"
    >
      <input autoFocus={true} className="pt-input" type="text" />
    </Label>
  ))
