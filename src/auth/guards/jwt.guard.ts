import { ExecutionContext, Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Observable } from "rxjs"

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        console.log("INSIDE JWT AUTH canActivate");
        return super.canActivate(context)
    }
}