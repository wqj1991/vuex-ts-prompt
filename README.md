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

then add folder `types` and add file `store.d.ts`

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
[typescript对vuex的全支持](http://wynnyo.com/archives/ts-vuex)

## 使用截图

- 全局变量 $store

  ![image-20210125121827015](http://images.wynnyo.com/Markdown/image-20210125121827015.png?x-oss-process=style/wynnyo-style)

- state

  ![image-20210125121850658](http://images.wynnyo.com/Markdown/image-20210125121850658.png?x-oss-process=style/wynnyo-style)

  ![image-20210125122153256](http://images.wynnyo.com/Markdown/image-20210125122153256.png?x-oss-process=style/wynnyo-style)

- getters

  ![image-20210125122249448](http://images.wynnyo.com/Markdown/image-20210125122249448.png?x-oss-process=style/wynnyo-style)

  ![image-20210125122330124](http://images.wynnyo.com/Markdown/image-20210125122330124.png?x-oss-process=style/wynnyo-style)

  ![image-20210125122422204](http://images.wynnyo.com/Markdown/image-20210125122422204.png?x-oss-process=style/wynnyo-style)

- commit

  ![image-20210125122538834](http://images.wynnyo.com/Markdown/image-20210125122538834.png?x-oss-process=style/wynnyo-style)

  ![image-20210125122616232](http://images.wynnyo.com/Markdown/image-20210125122616232.png?x-oss-process=style/wynnyo-style)

  ![image-20210125122648042](http://images.wynnyo.com/Markdown/image-20210125122648042.png?x-oss-process=style/wynnyo-style)

- dispatch

  ![image-20210125122737544](http://images.wynnyo.com/Markdown/image-20210125122737544.png?x-oss-process=style/wynnyo-style)

  ![image-20210125122803347](http://images.wynnyo.com/Markdown/image-20210125122803347.png?x-oss-process=style/wynnyo-style)

  ![image-20210125122834526](http://images.wynnyo.com/Markdown/image-20210125122834526.png?x-oss-process=style/wynnyo-style)
