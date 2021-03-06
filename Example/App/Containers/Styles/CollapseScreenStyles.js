import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  innerContainer: {
    paddingHorizontal: 15,
    paddingVertical: 30
  },
  title: {
    fontSize: 32,
    marginTop: 12,
    marginBottom: 8
  },
  heading: {
    marginTop: 12,
    marginBottom: 6,
    fontSize: 24
  },
  content: {
    fontSize: 16
  },
  contentContainer: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.violet,
    paddingHorizontal: 8,
    paddingTop: 4,
    paddingBottom: 16
  },
  spacer: {
    height: 10
  }
})
