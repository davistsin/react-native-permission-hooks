#import "PermissionHooks.h"
#import <CoreBluetooth/CoreBluetooth.h>

@implementation PermissionHooks
RCT_EXPORT_MODULE()

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(checkBluetoothPermission)
{
    bool hasPer = false;
    if (@available(iOS 13.1, *)) {
        CBManagerAuthorization status = [CBManager authorization];
        if (status == CBManagerAuthorizationAllowedAlways) {
            hasPer = true;
        }
    } else if (@available(iOS 13.0, *)) {
        CBCentralManager *centralManager = [[CBCentralManager alloc] init];
        CBManagerAuthorization status = [centralManager authorization];
        if (status == CBManagerAuthorizationAllowedAlways) {
            hasPer = true;
        }
    } else {
        hasPer = true;
    }
    return @(hasPer);
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativePermissionHooksSpecJSI>(params);
}
#endif

@end
