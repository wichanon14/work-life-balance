def commitSha1() {
    sh 'git rev-parse HEAD > commitSha1'
    def commit = readFile('commitSha1').trim()
    sh 'rm commitSha1'
    commit.substring(0, 6)
}

def remoteWeb01 = [:]
remoteWeb01.name = 'jamesjourney'
remoteWeb01.host = '165.22.242.255'
remoteWeb01.user = 'root'
remoteWeb01.allowAnyHosts = true


node('master') {
    stage('Clone repository') {
        checkout scm
    }

    stage('Prepare') {
        projectID = "work-life-balance"
        commitHash = commitSha1()
        envName = env.BRANCH_NAME
        registryIP = "https://registry.hub.docker.com"
        registryName = "registry.hub.docker.com"
        imgTag = "${envName}-${commitHash}"
    }

    stage('Build Image') {
        echo "Start building image [${projectID}:${imgTag}]"

        def dockerfile = "./Dockerfile"
        docker.withRegistry("${registryIP}","wichanon17978") {
            def img = docker.build("wichanon17978/${projectID}:latest")
            img.push("${envName}-latest")
        }

        echo "Removing docker image ${projectID}:${imgTag}"
        sh "docker rmi soilfish/${projectID}:${imgTag}"
        echo "cleanup docker images"
        sh "docker system prune -f"
    }

    /*withCredentials([sshUserPrivateKey(credentialsId: 'overquant', keyFileVariable: 'identity', usernameVariable: 'username')]) {
        remoteWeb01.user = 'ubuntu'
        remoteWeb01.identityFile = identity
        stage('Remote SSH') {
            slackSend color: 'good', message: "${projectID} start to deploy completed: ${imgTag}", channel: 'setscope_fundportal'    
            sshCommand remote: remoteWeb01, command: "cd fundweb && sudo docker-compose stop && sudo docker system prune -af"        
            withCredentials([usernamePassword(credentialsId: 'dockerhubSoilfish', passwordVariable: 'password', usernameVariable: 'username')]) {
                usr = username
                pwd = password
                sshCommand remote: remoteWeb01, command: "sudo docker login -u ${usr} -p ${pwd} ${registryIP} "    
                sshCommand remote: remoteWeb01, command: "sudo docker pull ${registryName}/soilfish/${projectID}:${envName}-latest"
                sshPut remote: remoteWeb01, from: 'docker-compose.yml', into: 'fundweb'
                sshCommand remote: remoteWeb01, command: "cd && cd fundweb && sudo docker-compose up -d"
                slackSend color: 'good', message: "${projectID} deploy completed: ${imgTag}", channel: 'setscope_fundportal'   
            }         
        }
    }*/
}
