/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import {User} from '../types/User.types'

const initialState: User = {
  name: '',
  email: '',
  id: '',
  role: '',
}

// creating slice and reduces for user to update values
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.role = action.payload.role;
    },
  },
})

export const { updateUser } = userSlice.actions

export default userSlice.reducer