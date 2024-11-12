import {CreateDataChannelRequest, CreateDataChannelResponse} from "@adjustmode1/proto-files";
import {Observable} from "rxjs";

export interface InternalChannelInterface {
  CreateDataChannel(
    data: CreateDataChannelRequest
  ): Observable<CreateDataChannelResponse>
}
