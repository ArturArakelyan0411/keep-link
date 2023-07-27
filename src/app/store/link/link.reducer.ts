import { createReducer, on } from '@ngrx/store';

// Actions
import {
  getLinks,
  getLinksFulfilled,
  getLinksRejected,
  addLink,
  addLinkFulfilled,
  addLinkRejected,
  editLink,
  editLinkFulfilled,
  editLinkRejected,
} from './link.actions';
import { logout } from '../auth';

// Types
import { LinkState } from './link.state';

export const initialState: LinkState = {
  list: [],
  loading: {
    getLinks: false,
    addLink: false,
    editLink: false,
  },
  error: {
    getLinks: false,
  },
};

export const linkReducer = createReducer(
  initialState,
  on(getLinks, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        getLinks: true,
      },
      error: {
        ...state.error,
        getLinks: false,
      },
    };
  }),
  on(getLinksFulfilled, (state, action) => {
    return {
      ...state,
      list: action.payload,
      loading: {
        ...state.loading,
        getLinks: false,
      },
      error: {
        ...state.error,
        getLinks: false,
      },
    };
  }),
  on(getLinksRejected, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        getLinks: false,
      },
      error: {
        ...state.error,
        getLinks: true,
      },
    };
  }),
  on(addLink, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        addLink: true,
      },
    };
  }),
  on(addLinkFulfilled, addLinkRejected, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        addLink: false,
      },
    };
  }),
  on(editLink, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        editLink: true,
      },
    };
  }),
  on(editLinkFulfilled, editLinkRejected, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        editLink: false,
      },
    };
  }),
  on(logout, () => {
    return initialState;
  }),
);
