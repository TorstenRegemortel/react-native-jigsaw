import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Animated, Easing } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../../Themes'
import styles from './Styles'

const DEFAULT_SIZE = 32
const DEFAULT_COLOR = Colors.default

export default class CheckBox extends PureComponent {
  constructor (props) {
    super(props)
    const animatedValueInit = props.checked ? 1 : 0
    this.animatedValue = new Animated.Value(animatedValueInit)
  }

  componentWillReceiveProps (nextProps) {
    /* Start animation when component receives next props. */
    const nextVal = nextProps.checked ? 1 : 0
    Animated.timing(
      this.animatedValue,
      {
        toValue: nextVal,
        duration: 250,
        easing: Easing.inOut(Easing.quad)
      }
    ).start()
  }

  renderCheckIcon = () => {
    const { renderCheck, color, size, invert } = this.props
    /* Render custom check component if provided */
    if (renderCheck) return renderCheck()

    const checkSize = Math.floor(0.8 * (size || DEFAULT_SIZE))
    const checkColor = invert ? Colors.white : (color || DEFAULT_COLOR)

    return <Icon name='done' size={checkSize} color={checkColor} style={styles.check} />
  }

  renderCheck = () => {
    /* Use animated opacity and scale values */
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.25, 1],
      outputRange: [0, 1, 1]
    })
    const scale = this.animatedValue.interpolate({
      inputRange: [0, 0.25, 1],
      outputRange: [0.5, 1.1, 1]
    })

    return (
      <Animated.View style={{transform: [{scale}], opacity}}>
        { this.renderCheckIcon() }
      </Animated.View>
    )
  }

  render () {
    const { onPress, style, size, color, invert } = this.props
    const checkBoxColor = color || DEFAULT_COLOR

    const dynamicStyle = {
      height: size || DEFAULT_SIZE,
      width: size || DEFAULT_SIZE,
      borderColor: checkBoxColor,
      backgroundColor: invert ? checkBoxColor : Colors.transparent
    }

    /* Check if component received custom style */
    const containerStyle = style || [dynamicStyle, styles.container]

    return (
      <TouchableOpacity onPress={onPress} style={containerStyle} activeOpacity={1}>
        <View style={styles.innerContainer}>
          { this.renderCheck() }
        </View>
      </TouchableOpacity>
    )
  }
}
