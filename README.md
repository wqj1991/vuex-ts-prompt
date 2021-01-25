# vuex-ts-prompt
vuex-ts-prompt is a tool for vuex and TypeScript 4.1+。

## Start

```
npm install typescript --save-dev
npm i vuex-ts-prompt --save
```

then modify your store.ts

```TypeScript
import Vuex from 'vuex';
import { GetActionsType, GetGettersType, GetMutationsType, GetPayLoad, GetReturnType, GetStateType } from 'vuex-ts-prompt';

const vuexOptions = {
    state,
    getters,
    actions,
    mutations,
    modules: {
        home,
        detail,
    }
};

export type State = GetStateType<typeof vuexOptions>

export type Getters = GetGettersType<typeof vuexOptions>

type Mutations = GetMutationsType<typeof vuexOptions>;

type Actions = GetActionsType<typeof vuexOptions>;

// state?: S | (() => S);
// getters?: GetterTree<S, S>;
// 这里把 state 类型设置为 any 是为了让参数不受约束
const store = new Vuex.Store<any>(vuexOptions)
```

then add folder `types` and add file `folder/store.d.ts`

```
import { Commit, Dispatch, Getters, State } from '@/store'

declare module 'vue/types/vue' {
	export declare class Store<S> {
		state: State
		getters: Getters
		dispatch: Dispatch
		commit: Commit
	}

	interface Vue {
		$store: Store<State>
	}
}
```
## Reading
[typescript对vuex的全支持](http://wynnyo.com/archives/ts-vuex-prompt)
