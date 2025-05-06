pipeline {
    agent any
    triggers {
        githubPush()
    }
    stages {
        stage('Run Docker Info') {
            steps {
                script {
                    // Execute docker info command
                    sh 'docker info'
                }
            }
        }
    }
    post {
        always {
            // Notify GitHub of the build status
            echo 'Build completed. Docker info executed.'
        }
        success {
            echo 'Docker info retrieved successfully!'
        }
        failure {
            echo 'Failed to retrieve Docker info.'
        }
    }
}