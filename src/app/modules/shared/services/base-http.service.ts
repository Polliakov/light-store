import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { ErrorService } from "./error.service";

export abstract class BaseHttpService {
  constructor(
    protected http: HttpClient,
    protected errorService: ErrorService
  ) {

  }

  protected toImageMultipart(dto: any, image: File | null): FormData {
    const formData = new FormData();
    formData.append('dto', JSON.stringify(dto))
    if (image) {
      formData.append('image', image, image.name);
    }
    return formData
  }

  protected handleError(error: HttpErrorResponse) {
    this.errorService.handleHttpError(error);
    return throwError(() => error.message);
  }
}
