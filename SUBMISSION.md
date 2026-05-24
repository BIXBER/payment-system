# Advanced Git Tools Assignment Submission

## Repository Information
- Repository URL: https://github.com/BIXBER/payment-system
- Main branch: main
- Feature branch: feature/progressive-commission

## Bug Investigation Results
1. Bisect result - problematic commit:
$ git bisect start
status: waiting for both good and bad commits
bixber@bixber-Precision-T3600:~/Dev/STEPIK/git/payment-system (main|BISECTING)
$ git bisect bad HEAD
status: waiting for good commit(s), bad commit known
bixber@bixber-Precision-T3600:~/Dev/STEPIK/git/payment-system (main|BISECTING)
$ git bisect good dcc30a3
Bisecting: 2 revisions left to test after this (roughly 1 step)
[ae423346024786025531ca3fc13af52a78f649ec] Use current-specific commission rates
bixber@bixber-Precision-T3600:~/Dev/STEPIK/git/payment-system ((ae42334...)|BISECTING)
$ node test-payment.js; echo $?
0
bixber@bixber-Precision-T3600:~/Dev/STEPIK/git/payment-system ((ae42334...)|BISECTING)
$ git bisect good
Bisecting: 0 revisions left to test after this (roughly 1 step)
[08282b839984a02bb2cbea65d43ce7ac6b79c6c0] Extract commission calculation
bixber@bixber-Precision-T3600:~/Dev/STEPIK/git/payment-system ((08282b8...)|BISECTING)
$ node test-payment.js; echo $?
1
bixber@bixber-Precision-T3600:~/Dev/STEPIK/git/payment-system ((08282b8...)|BISECTING)
$ git bisect bad
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[523e2add0d07b4ad3ae8a1710263d9259fe34756] Optimize commission calculation
bixber@bixber-Precision-T3600:~/Dev/STEPIK/git/payment-system ((523e2ad...)|BISECTING)
$ node test-payment.js; echo $?
1
bixber@bixber-Precision-T3600:~/Dev/STEPIK/git/payment-system ((523e2ad...)|BISECTING)
$ git bisect bad
523e2add0d07b4ad3ae8a1710263d9259fe34756 is the first bad commit
commit 523e2add0d07b4ad3ae8a1710263d9259fe34756
Author: Aleksandr Bynkov <bixber.commercial@yandex.ru>
Date:   Sun May 24 15:49:34 2026 +0300

    Optimize commission calculation

 src/payment.js | 5 ++---
 1 file changed, 2 insertions(+), 3 deletions(-)


2. Blame analysis - who introduced the bug:
$ git blame src/payment.js | grep 523e2a
523e2add (Aleksandr Bynkov 2026-05-24 15:49:34 +0300  5)     const total = amount + (amount * commission); // Изменили порядок операций
523e2add (Aleksandr Bynkov 2026-05-24 15:49:34 +0300  8)         commission: commission, // БАГ: теперь возвращаем rate, а не сумму

3. Search for commission changes:
$ git log -S"commission:" --patch
commit dcc30a3a8bfe56a563f89b188be7eed49dfcf2c1
Author: Aleksandr Bynkov <bixber.commercial@yandex.ru>
Date:   Sun May 24 15:46:13 2026 +0300

    Initial payment system setup

diff --git a/src/payment.js b/src/payment.js
new file mode 100644
index 0000000..e4eb8de
--- /dev/null
+++ b/src/payment.js
@@ -0,0 +1,13 @@
+// Payment processing module
+function processPayment(amount, currency) {
+    const commission = 0.02; // 2% commission
+    const total = amount * (1 + commission);
+    return {
+        amount: amount,
+        commission: amount * commission,
+        total: total,
+        currency: currency
+    };
+}
+
+module.exports = { processPayment };

## Recovery Operations
1. Stash operations performed:
git stash list
stash@{0}: WIP on feature/progressive-commission: WIP: Progressive commission feature

2. Reflog recovery command:
git reset --hard HEAD@{3}

## Verification Commands
Run these to verify the assignment completion:
```bash
# Check that bug is fixed
node test-payment.js && echo "Bug fixed!"

# Verify revert was used
git log --oneline | grep Revert

# Check clean history in feature branch  
git log --oneline feature/progressive-commission ^main

# Verify no sensitive files
git log --all --full-history -- config/secret-keys.json
```

## Self-Assessment Checklist
- [ ] Used stash to save work in progress
- [ ] Found bug using git bisect
- [ ] Used blame to identify author
- [ ] Fixed bug using revert (not reset)
- [ ] Recovered lost commit using reflog
- [ ] Cleaned up feature branch history
- [ ] Removed sensitive file from history
- [ ] All stashes cleaned up
- [ ] Created comprehensive incident report
