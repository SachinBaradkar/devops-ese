pipeline {
    agent any

    tools {
        nodejs 'NodeJS-18'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    rm -rf /var/www/react-cicd-app/*
                    cp -r build/* /var/www/react-cicd-app/
                '''
                echo "Deployed successfully!"
            }
        }

    }

    post {
        success { echo "SUCCESS" }
        failure { echo "FAILED" }
        always  { cleanWs() }
    }
}