export interface Action< PayloadType = any > {
  type : string;
  payload : PayloadType;
};

export interface Actions {
  actions: Record< string, Action >
};