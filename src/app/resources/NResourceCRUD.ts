import {Resource, ResourceMethod ,ResourceAction} from 'ng2-resource-rest';

export declare class NResourceCRUD<TQuery, TShort, TFull> extends Resource {
    @ResourceAction({
    isArray: false //, map: function(x: Object): TShort { return x as TShort }
  })
    query: ResourceMethod< TQuery, TShort>;
    //query: ResourceMethod<TQuery, TShort[]>;
    get: ResourceMethod<{
        id: any;
    }, TFull>;
    save: ResourceMethod<TFull, TFull>;
    update: ResourceMethod<TFull, TFull>;
    remove: ResourceMethod<{
        id: any;
    }, any>;
    create(data: TFull, callback?: (res: TFull) => any): TFull;
}