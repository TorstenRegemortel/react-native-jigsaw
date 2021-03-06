import React, { PureComponent } from 'react'
import { View, Platform, Picker, TouchableNativeFeedback, Text, FlatList } from 'react-native'
import ModalContainer from '../ModalContainer/ModalContainer'
import Button from '../Button/Button'
import styles from './Styles'

export default class JigsawPicker extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      pickerValue: props.value
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ pickerValue: nextProps.value })
    }
  }

  componentWillUpdate (nextProps, nextState) {
    // Update component's state if value prop has changed
    if (Platform.OS === 'ios') {
      if (nextProps.value != null && nextProps.value !== this.props.value) {
        this.setState({ pickerValue: nextProps.value })
      }
    }
  }

  handleValueChangeIOS = (pickerValue) => this.setState({ pickerValue })

  acceptChangeIOS = () => {
    this.props.onValueChange(this.state.pickerValue)
    this.props.closePicker()
  }

  renderButtonsIOS = () => {
    const { closePicker, renderButtonsIOS, leftText, rightText } = this.props

    // Use custom buttons
    if (renderButtonsIOS) return renderButtonsIOS(this.acceptChangeIOS, closePicker)

    const leftButtonText = leftText || 'Cancel'
    const rightButtonText = rightText || 'OK'

    return (
      <View style={styles.buttons}>
        <View style={styles.buttonContainer}>
          <Button onPress={closePicker} text={leftButtonText} width='100%' secondary />
        </View>
        { this.renderSpacer() }
        <View style={styles.buttonContainer}>
          <Button onPress={this.acceptChangeIOS} text={rightButtonText} width='100%' />
        </View>
      </View>
    )
  }

  renderPickerIOS = () => {
    const { items } = this.props
    const { pickerValue } = this.state

    return (
      <View>
        <Picker selectedValue={pickerValue} onValueChange={this.handleValueChangeIOS}>
          {items.map(({label, value}, index) => (
            <Picker.Item key={index} label={label} value={value} />
          ))}
        </Picker>
        {this.renderButtonsIOS()}
      </View>
    )
  }

  renderPickerItemAndroid = ({item, index}) => {
    /* Handle item press and close modal */
    const handleItemPress = () => {
      this.props.onValueChange(item.value)
      this.props.closePicker()
    }

    return (
      <TouchableNativeFeedback
        key={index}
        background={TouchableNativeFeedback.SelectableBackground()}
        onPress={handleItemPress}
      >
        <View style={styles.pickerItemAndroid}>
          <Text style={styles.pickerItemLabelAndroid} numberOfLines={1}>{item.label}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }

  keyExtractor = (item, index) => index.toString()
  renderSpacer = () => <View style={styles.spacer} />

  renderPickerAndroid = () => (
    <FlatList
      data={this.props.items}
      renderItem={this.renderPickerItemAndroid}
      keyExtractor={this.keyExtractor}
      ListHeaderComponent={this.renderSpacer}
      ListFooterComponent={this.renderSpacer}
    />
  )

  renderPicker = () => Platform.OS === 'ios' ? this.renderPickerIOS() : this.renderPickerAndroid()

  render () {
    const { visible, closePicker, style, overlayColor } = this.props

    const platformStyles = Platform.OS === 'ios' ? style : (style || styles.modalAndroid)

    return (
      <ModalContainer
        visible={visible}
        onRequestClose={closePicker}
        style={platformStyles}
        overlayColor={overlayColor}
      >
        { this.renderPicker() }
      </ModalContainer>
    )
  }
}
