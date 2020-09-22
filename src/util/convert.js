const INVITE_FOLLOW_APP_STATE_TABLE = {
    0x01: '待审核',
    0x02: '上线',
    0x03: '拒绝',
    0x04: '已结束',
};

export const asInviteFollowAppStateText = state => {
    if (INVITE_FOLLOW_APP_STATE_TABLE.hasOwnProperty(state)) {
        return INVITE_FOLLOW_APP_STATE_TABLE[state];
    }
    return `ERROR:${state}`;
};