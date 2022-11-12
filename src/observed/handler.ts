import { HandlerKeywords, OnChangesFn, OnReadFn, toObject } from './types';

class ChangeDetectionHandler<T extends {}> {
  latestInstance?: T;
  __onChangeFunctionList: OnChangesFn[] = [];
  __onReadFunctionList: OnReadFn[] = [];
  constructor(
    private onChanges: OnChangesFn[],
    private onReadAccess: OnReadFn[],
    private isChildProxy?: boolean,
    private prependPath?: string
  ) {
    this.__onChangeFunctionList = onChanges;
    this.__onReadFunctionList = onReadAccess;
    return this;
  }
  buildPropertyChangePath(property: any) {
    return this.prependPath ? this.prependPath + '.' + property : property;
  }

  isPreserved(propertyName: any) {
    return Object.keys(HandlerKeywords).find(
      (key) =>
        (HandlerKeywords as any)[key as any] === propertyName ||
        propertyName?.includes((HandlerKeywords as any)[key as any])
    );
  }

  get(instance: T, instanceProperty: keyof T): any {
    // @ts-ignore
    instance['addOnChange'] = (fn: OnChangesFn): void => {
      this.__onChangeFunctionList.push(fn);
    };
    // @ts-ignore
    instance['addOnRead'] = (fn: OnReadFn): void => {
      this.__onReadFunctionList.push(fn);
    };
    if (this.isPreserved(instanceProperty)) {
      return instance[instanceProperty];
    }
    const propValue: ChangeDetectionHandler<any> = instance[instanceProperty] as any as ChangeDetectionHandler<any>;
    console.log(this.__onReadFunctionList);
    this.__onReadFunctionList.forEach((fn) => {
      fn([this.buildPropertyChangePath(instanceProperty)] as any as keyof T[]);
    });
    if (typeof propValue === 'object' && !propValue.isChildProxy) {
      return WatchThis(
        instance[instanceProperty] as any,
        this.__onChangeFunctionList,
        this.__onReadFunctionList,
        true,
        `${this.prependPath ? this.prependPath + '.' : ''}${instanceProperty as any}`
      );
    }
    if (typeof instance[instanceProperty] === 'function') {
      (instance[instanceProperty] as typeof Function) = (instance[instanceProperty] as typeof Function).bind(instance);
    }
    return instance[instanceProperty];
  }

  set(instance: T, instanceProperty: keyof T, value: any): any {
    this.latestInstance = instance;
    instance[instanceProperty] = value;
    if (typeof value === 'object' && !(value as ChangeDetectionHandler<any>).isChildProxy) {
      instance[instanceProperty] = WatchThis(
        value,
        this.__onChangeFunctionList,
        this.__onReadFunctionList,
        true,
        `${this.prependPath ? this.prependPath + '.' : ''}${instanceProperty as any}`
      );
    }

    if (this.isPreserved(instanceProperty)) {
      return false;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // this.latestInstance.__setLatestUpdates([this.buildNotificationPath(instanceProperty)] as any as keyof T[]);
    this.__onChangeFunctionList.forEach((fn) => {
      fn([this.buildPropertyChangePath(instanceProperty)] as any as keyof T[]);
    });

    return true;
  }
}

export function WatchThis<T extends object>(
  classToWatch: T,
  onChanges: OnChangesFn[],
  onReadAccess: OnReadFn[],
  isChildProxy?: boolean,
  prependPath?: string
): T {
  return new Proxy(
    toObject(classToWatch),
    new ChangeDetectionHandler(onChanges, onReadAccess, isChildProxy, prependPath)
  ) as any as T;
}
