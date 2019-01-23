// tslint:disable:class-name

import {
    FieldState,
} from "formstate";

import ServiceType from "@app/Entity/ServiceType";

export interface ObjString_String {
    [key: string]: string,
}

export interface ObjString_ArrString {
    [key: string]: string[];
}

export interface ObjString_Object {
    [key: string]: {};
}

export interface ObjString_ObjString {
    [key: string]: {
        [key: string]: string
    }
}

export interface Jsonify {
    toJson: () => ({}),
}

// Allows class to typehint constructor args from its own class properties
export type ObjectFields<T> = {
    [P in keyof T]: T[P];
} | {};

export interface ProjectBaseFormI {
    name: FieldState<string>,
}

export interface ServiceBaseFormI {
    name: FieldState<string>,
    nameInUse: FieldState<boolean>,
    version: FieldState<string>,
    type: FieldState<ServiceType | undefined>,
}

export interface ServiceAppFormI extends ServiceBaseFormI {
    appRoot: FieldState<string>,
}

// Nginx/Apache + App form fields
export interface ServiceAppVhostFormI extends ServiceAppFormI {
    vhost: FieldState<string>,
    vhostData: FieldState<string>,
    vhostType: FieldState<string>,
}

// Nginx/Apache form fields
export interface ServiceVhostFormI extends ServiceAppFormI {
    vhost: FieldState<string>,
    vhostData: FieldState<string>,
}

// Used by Nginx/Apache for vhost configs
export type VhostConfig = {
    engine: "html" | "node" | "none" | "php",
    type: string,
    name: string,
    description: string,
    readOnly: boolean,
    data: string,
}

// key-indexed object containing ServiceType objects
// const asServiceTypes = <T extends { [key: string]: ServiceType }>(arg: T): T => {
//     return arg;
// };
