import React, { Component } from 'react'

import Form from 'grommet/components/Form'
import Header from 'grommet/components/Header'
import FormFields from 'grommet/components/FormFields'
import TextInput from 'grommet/components/TextInput'
import FormField from 'grommet/components/FormField'
import Button from 'grommet/components/Button'
import Footer from 'grommet/components/Footer'
import CloseIcon from 'grommet/components/icons/base/Close'
import CafeteriaIcon from 'grommet/components/icons/base/Cafeteria'

import './AddRecipe.css'

class AddRecipe extends Component {
  render () {
    if (this.props.active) {
      var { submitAdd, cancelAdd, onAddTitle, onAddIngredients } = this.props
      return (
        <Form id='form' style={{
          'opacity': '1',
          'zIndex':'100'
        }} pad='small'>
          <Header  direction='row' full='horizontal' justify='between'>
            <div>
            <CafeteriaIcon size='medium' />
            <span style={{'fontWeight':'bold', 'color':'white','fontSize':'30px'}}>
              Add
            </span>
            </div>
            <Button icon={<CloseIcon size='medium' />} onClick={cancelAdd} />
          </Header>
          <FormFields >
            <FormField style={{'margin':'10px auto', 'width':'80%'}} label='title'>
              <TextInput id='text-input' onDOMChange={onAddTitle} />
            </FormField>
            <FormField style={{'margin':'10px auto', 'width':'80%'}} label='ingredients'>
              <TextInput id='text-input' onDOMChange={onAddIngredients} />
            </FormField>
          </FormFields>
          <Footer id='footer' direction='row' full='horizontal' justify='end'>
            <Button
              fill={true}
              label='submit recipe'
              type='submit'
              primary={true}
              onClick={submitAdd}
              style={{'marginTop':'10px', 'backgroundColor':'rgb(0,131,117)','border':'none'}} />
          </Footer>
        </Form>
      )
    } else {
      return (
        <Form id='form' style={{
          'opacity': '0',
          'zIndex': '-100'
        }} pad='small'>
        </Form>
      )
    }
  }
}

export default AddRecipe
