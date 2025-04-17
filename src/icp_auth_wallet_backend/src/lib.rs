use ic_cdk::api;
use ic_cdk::export::Principal;

#[ic_cdk_macros::init]
fn init() {
    ic_cdk::println!("icp_auth_wallet canister initialized");
}

#[ic_cdk_macros::query]
fn whoami() -> String {
    let caller: Principal = api::caller();
    caller.to_text()
}
