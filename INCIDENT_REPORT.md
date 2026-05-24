# Incident Report: Payment Commission Bug

## Bug Discovery
- Found using: git bisect start
- Problematic commit: 523e2add0d07b4ad3ae8a1710263d9259fe34756
- Author: Aleksandr

## Root Cause
The bug was introduced in the "Optimize commission calculation" commit where:
1. Commission calculation was changed to return rate instead of amount
2. Неверно считалась сумма заказа

## Fix Applied
- Reverted commit: 006038f7e2256366605ae60f279d008239de6393
- Fix commit: 20dc107db6ce67dec165a46cdc12765dfa38970e
- Verification: node test-payment.js; echo $?;

## Stash Usage
- Stashed work: Logic with commission calculation
- Stash command used: git stash push -m "WIP: Progressive commission feature"
- Recovery successful: Yes

## Reflog Recovery
- Lost commit: 7ecb1ed862d9be44edc99b7576903b87823bcbf9
- Recovery command: git reset --hard HEAD@{3}
- Restored SHA: ce8f2a1

## Lessons Learned
I learn to use git tools like revert, reset, stash, reflog, bisect, grep, blame, lfsk, etc... That's reallt cool and I'm really happy for it. There are tools will help me for researching my pet project in the future!
