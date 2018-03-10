import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import '../node_modules/normalize.css/normalize.css'
import '../../blueprint/packages/core/lib/css/blueprint.css'
import '../../blueprint/packages/datetime/lib/css/blueprint-datetime.css'
import '../../blueprint/packages/datetime/lib/css/blueprint-datetime.css'
import moment from 'moment';
import { DateInput } from '../../blueprint/packages/datetime/lib/esm';


import {
  Table,
  Column,
  Cell,
  SelectionModes
} from '../../blueprint/packages/table/lib/esm'

const cellRenderer = (rowIndex) => {
    return <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
}

class BuggyTable extends Component {
  constructor() {
    super()
    this.state = {
      selection: [],
    }
  }

  render() {
    return (
      <Table
        numRows={1}
        selectionModes={SelectionModes.ALL}
        onSelection={this.updateSelection.bind(this)}
      >
        <Column
          name="foo"
          renderCell={(rowIndex) => <Cell>bar</Cell>}
        />
        <Column
          name="foo"
          renderCell={(rowIndex) => <Cell>bar</Cell>}
        />
        <Column
          name="foo"
          renderCell={(rowIndex) => <Cell>bar</Cell>}
        />
      </Table>
    );
  }

  updateSelection(selection) {
    // setTimeout(() => {
    console.log('state to be set', selection)
    this.setState({test: ''})
    console.log('After set state:', this.state.selection)
    // }, 0);
  }
}

class NonBuggyTable extends Component {
  constructor() {
    super()
    this.state = {
      selection: [],
    }
  }

  render() {
    return (
      <Table
        numRows={1}
        selectionModes={SelectionModes.ALL}
        onSelection={this.updateSelection}
      >
        <Column
          name="foo"
          renderCell={(rowIndex) => <Cell>bar</Cell>}
        />
        <Column
          name="foo"
          renderCell={(rowIndex) => <Cell>bar</Cell>}
        />
        <Column
          name="foo"
          renderCell={(rowIndex) => <Cell>bar</Cell>}
        />
      </Table>
    );
  }

  updateSelection(selection) {
    console.log('Non Buggy:',selection)
    //this.setState({ selection });
  }
}

class SupplierPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      allowSingleDayRange: false,
      closeOnSelection: false,
      contiguousCalendarMonths: true,
      disabled: false,
      format: FORMATS[0],
      range: [null, null],
      reverseMonthAndYearMenus: false,
      selectAllOnFocus: false,
    };
  }

  render() {
    const { date, format, ...spreadProps } = this.state;
    return (
      <div>
        <DateInput
          {...spreadProps}
          {...format}
          defaultValue={new Date()}
          className="foofoofoo"
          popoverProps={{ popoverClassName: 'barbarbar', content: 'hi' }}
          inputProps={{ className: 'bazbazbaz' }}
        />
      </div>

    );
  }
}

export const FORMATS = [
  {
    formatDate: (date) => (date == null ? '' : date.toLocaleDateString()),
    placeholder: 'JS Date',
    parseDate: (str) => new Date(Date.parse(str)),
  },
  momentFormatter('MM/DD/YYYY'),
  momentFormatter('YYYY-MM-DD'),
  momentFormatter('YYYY-MM-DD HH:mm:ss'),
];

function momentFormatter(format) {
  return {
    formatDate: (date) => moment(date).format(format),
    placeholder: `${format} (moment)`,
    parseDate: (str) => moment(str, format).toDate(),
  };
}


storiesOf('Component', module)
  .add('with text', () => (
    <div>

      <SupplierPage />
    </div>
  ))
