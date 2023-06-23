
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNPermissionHooksSpec.h"

@interface PermissionHooks : NSObject <NativePermissionHooksSpec>
#else
#import <React/RCTBridgeModule.h>

@interface PermissionHooks : NSObject <RCTBridgeModule>
#endif

@end
