// Job 1: Manual Job to execute docker info
job('Manual-Docker-Info') {
    description('Manually triggered job to execute docker info')
    steps {
        shell('docker info')
    }
}

// Job 2: GitHub Webhook Triggered Job to execute docker info
job('Webhook-Docker-Info') {
    description('Job triggered by GitHub webhook to execute docker info')
    scm {
        git {
            remote {
                github('dythia102/coding-test')
                credentials('github-pat')
            }
            branch('main')
        }
    }
    triggers {
        githubPush()
    }
    steps {
        shell('docker info')
    }
}