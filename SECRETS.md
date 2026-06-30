# todo-frontend — GitHub Secrets

Go to: GitHub repo → Settings → Secrets and variables → Actions → New repository secret

Add these 3 secrets:

| Secret name       | What to put in it                              |
|-------------------|------------------------------------------------|
| VM_IP             | Public IP of your frontend Azure VM            |
| VM_USER           | azureuser                                      |
| SSH_PRIVATE_KEY   | Contents of your private SSH key (see below)   |
| BACKEND_API_URL   | http://<BACKEND_VM_IP>/api                     |


## How to generate the SSH key (run once on your local machine)

  ssh-keygen -t ed25519 -C "github-deploy" -f ~/.ssh/gh_deploy -N ""

Then add the PUBLIC key to your frontend VM:

  ssh azureuser@<FRONTEND_VM_IP> "echo '$(cat ~/.ssh/gh_deploy.pub)' >> ~/.ssh/authorized_keys"

The PRIVATE key (~/.ssh/gh_deploy) is what you paste into the SSH_PRIVATE_KEY secret.

Note: if you already generated this key for the backend repo,
reuse the same key pair — just add the public key to this VM too.
