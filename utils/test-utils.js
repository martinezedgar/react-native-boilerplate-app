import {render} from '@testing-library/react-native'
import { Provider } from 'react-redux'

import store from '../src/store/config'

const AllTheProviders = ({children}) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react-native'

// override render method
export {customRender as render}