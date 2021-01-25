type GetRestFuncType<T> = T extends (context: any, ...params: infer P) => infer R ? (...args: P) => R : never

type AddPrefix<Keys, Prefix = ''> = `${Prefix & string}${Prefix extends '' ? '' : '/'}${Keys & string}`

type GetStateTypes<Module> = Module extends { state: infer M }
	? {
			[StsteKey in keyof M]: M[StsteKey]
	  }
	: never

type GetGettersTypes<Module, ModuleName = ''> = Module extends { getters: infer M }
	? {
			[GetterKey in keyof M as AddPrefix<GetterKey, ModuleName>]: ReturnType<M[GetterKey]>
	  }
	: never

type GetMutationsTypes<Module, ModuleName = ''> = Module extends { mutations: infer M }
	? {
			[MutationKey in keyof M as AddPrefix<MutationKey, ModuleName>]: GetRestFuncType<M[MutationKey]>
	  }
	: never

type GetActionsTypes<Module, ModuleName = ''> = Module extends { actions: infer M }
	? {
			[ActionKey in keyof M as AddPrefix<ActionKey, ModuleName>]: GetRestFuncType<M[ActionKey]>
	  }
	: never

type GetModulesGetterTypes<Modules> = {
	[K in keyof Modules]: GetGettersTypes<Modules[K], K>
}[keyof Modules]

type GetModulesMutationTypes<Modules> = {
	[K in keyof Modules]: GetMutationsTypes<Modules[K], K>
}[keyof Modules]

type GetModulesActionTypes<Modules> = {
	[K in keyof Modules]: GetActionsTypes<Modules[K], K>
}[keyof Modules]

type GetSubModuleStateTypes<Module> = Module extends { modules: infer SubModules }
	? {
			[K in keyof SubModules]: GetStateTypes<SubModules[K]>
	  }
	: never

type GetSubModuleGettersTypes<Module> = Module extends { modules: infer SubModules }
	? {
			[K in keyof SubModules]: GetGettersTypes<SubModules[K], K>
	  }[keyof SubModules]
	: never

type GetSubModuleMutationsTypes<Module> = Module extends { modules: infer SubModules } ? GetModulesMutationTypes<SubModules> : never

type GetSubModuleActionsTypes<Module> = Module extends { modules: infer SubModules } ? GetModulesActionTypes<SubModules> : never

type UnionToIntersection<T> = (T extends any ? (k: T) => void : never) extends (k: infer I) => void ? I : never

type GetTypeOfKey<T, K extends keyof T> = {
	[Key in keyof T]: K extends keyof T ? T[K] : never
}[keyof T]

type GetParam<T> = T extends () => any ? undefined : T extends (arg: infer R) => any ? R : any

type ReturnType<T> = T extends (...args: any) => infer R ? R : any

export type GetStateType<R> = UnionToIntersection<GetSubModuleStateTypes<R> | GetStateTypes<R>>

export type GetGettersType<R> = UnionToIntersection<GetSubModuleGettersTypes<R> | GetGettersTypes<R>>

export type GetMutationsType<R> = UnionToIntersection<GetSubModuleMutationsTypes<R> | GetMutationsTypes<R>>

export type GetActionsType<R> = UnionToIntersection<GetSubModuleActionsTypes<R> | GetActionsTypes<R>>

export type GetPayLoad<T, K extends keyof T> = GetParam<GetTypeOfKey<T, K>>

export type GetReturnType<T, K extends keyof T> = ReturnType<GetTypeOfKey<T, K>>
