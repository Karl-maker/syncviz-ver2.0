const VS = require("../../services/virtual-space");
const wrapper = require("../../middlewares/wrapper");
const constants = require("../../constants");
const config = require("../../config");
const authenticate = require("../../middlewares/authenticate");
const errorHandler = require("../../utils/socket-error-handler");
const path = require("path");

const fs = require("fs");

module.exports = virtualSpaceHandler = async (io) => {
 const NameSpace = io.of(constants.namespaces.VIRTUAL_SPACE);

 NameSpace.use(wrapper(authenticate));

 NameSpace.on("connection", async (socket) => {
  const VirtualSpace = new VS();
  const User = socket.request.user;

  // Actions when user connects to ns

  User.socket_id = socket.id;
  socket.username = User.username;
  VirtualSpace.socket = socket;
  VirtualSpace.attendee = User;
  VirtualSpace.attendee = User;
  VirtualSpace.namespace = NameSpace;

  // Return current user data

  socket.emit("current-user", VirtualSpace.attendee.get()); // socket_d

  // Events avaliable to users not connected to a vs

  socket.on("join", joinVirtualSpace);
  socket.on("manage", manageVirtualSpace);
  socket.on("create", createVirtualSpace);
  socket.on("attributes", updateAttributes);
  socket.on("disconnect", leaveVirtualSpace);
  socket.on("delete", endVirtualSpace);
  socket.on("send-message", sendMessageToChat);
  socket.on("update-user", updateUserDetails);
  socket.on("update-environment-url", updateVirtualSpaceEnvironmentURL);
  socket.on("add-tag", addTagToVirtualSpace);
  socket.on("delete-tag", deleteTagFromVirtualSpace);
  socket.on("get-tags", getTags);

  // WebRTC

  /*

  1. Update by sending file through HTTP

  */

  /*

  Listeners

  1. updates - general updates e.g. when users join
  2. alerts - major alerts
  3. messages / private-messages - messages
  4. viewers - viewers attending virtual space 
  5. attributes - virtual space attributes
  6. timer - time limit
  7. me - my data
  8. tags - listen for them 

  */

  function deleteTagFromVirtualSpace({ tag_id }) {
   VirtualSpace.deleteTag(tag_id)
    .then((data) => {
     NameSpace.to(VirtualSpace.id).emit("updates", {
      message: `Tag was removed`,
      type: "tag",
     });

     NameSpace.to(VirtualSpace.id).emit("remove-tag", {
      data,
     });
    })
    .catch((err) => errorHandler(err, socket));
  }

  function addTagToVirtualSpace(data) {
   VirtualSpace.addTag(data)
    .then((tag) => {
     NameSpace.to(VirtualSpace.id).emit("add-tag", {
      data: tag,
     });

     NameSpace.to(VirtualSpace.id).emit("updates", {
      message: `Tag was added`,
      type: "tag",
     });
    })
    .catch((err) => errorHandler(err, socket));
  }

  function getTags() {
   VirtualSpace.getAllTags()
    .then((tags) => {
     socket.emit("add-tags", tags);
    })
    .catch((err) => {
     return [];
    });
  }

  function manageVirtualSpace({ id, code }) {
   const virtual_space_id = id;

   VirtualSpace.manage(virtual_space_id, code)
    .then(({ message, virtual_space }) => {
     // Notify current attendees of updated viewer list
     VirtualSpace.getSocketClients(NameSpace.in(VirtualSpace._id)).then(
      (viewers) => {
       NameSpace.to(VirtualSpace._id).emit("viewers", viewers);

       const { users } = viewers;
       const currentUsers = users.filter(function (value, index, arr) {
        return value.socket_id !== VirtualSpace.attendee.socket_id;
       });
       socket.emit("current-users", { users: currentUsers });
      }
     );

     // Send new attendee the current attributes of meeting
     socket.emit("attributes", { virtual_space });
     virtual_space.model.url &&
      socket.emit("3D", {
       url: virtual_space.model.url,
       message: `Updating room`,
      });

     // Notify current attendees who has joined
     NameSpace.to(VirtualSpace.id).emit("updates", {
      message: `${VirtualSpace.attendee.username} has reconnected`,
     });
    })
    .catch((err) => {
     // Disconnect socket
     errorHandler(err, socket);
     socket.disconnect(true);
    });
  }

  function joinVirtualSpace() {
   const virtual_space_id = socket.handshake.query.virtual_space_id;

   VirtualSpace.join(virtual_space_id)
    .then(({ message, virtual_space }) => {
     // Notify current attendees of updated viewer list
     VirtualSpace.getSocketClients(NameSpace.in(VirtualSpace._id)).then(
      (viewers) => {
       NameSpace.to(VirtualSpace._id).emit("viewers", viewers);

       const { users } = viewers;
       const currentUsers = users.filter(function (value, index, arr) {
        return value.socket_id !== VirtualSpace.attendee.socket_id;
       });
       socket.emit("current-users", { users: currentUsers });
      }
     );

     // Send new attendee the current attributes of meeting
     socket.emit("attributes", { virtual_space });

     virtual_space.model.url &&
      socket.emit("3D", {
       url: virtual_space.model.url,
       message: `Updating room`,
      });

     // Notify current attendees who has joined
     NameSpace.to(VirtualSpace.id).emit("updates", {
      message: `${VirtualSpace.attendee.username} has joined`,
     });
    })
    .catch((err) => {
     // Disconnect socket
     socket.disconnect(true);
     errorHandler(err, socket);
    });
  }

  function createVirtualSpace({ description, code }) {
   VirtualSpace.create({
    creator_id: socket.id,
    description,
    code,
    username: VirtualSpace.attendee.username,
    user_theme: VirtualSpace.attendee.color,
    time_limit: 90,
   })
    .then(({ message, virtual_space }) => {
     // Prompt creator
     socket.emit("alerts", { message, type: "info" });
     return { virtual_space };
    })
    .then(({ virtual_space }) => {
     // Join and Get current viewer's list which should only be the creator
     return VirtualSpace.join(virtual_space._id.toString())
      .then(({ message, virtual_space }) => {
       VirtualSpace.getSocketClients(NameSpace.in(VirtualSpace._id)).then(
        (viewers) => {
         const { users } = viewers;
         NameSpace.to(VirtualSpace._id).emit("viewers", viewers);

         const currentUsers = users.filter(function (value, index, arr) {
          return value.socket_id !== VirtualSpace.attendee.socket_id;
         });
         socket.emit("current-users", { users: currentUsers });
        }
       );

       // Send new attendee the current attributes of meeting
       socket.emit("attributes", { virtual_space });

       if (virtual_space.model.url) {
        socket.emit("3D", {
         message: `Updating room`,
         url: virtual_space.model.url,
        });
       }

       VirtualSpace.time(NameSpace.to(VirtualSpace._id));

       return { virtual_space };
      })
      .catch((err) => {
       throw err;
      });
    })
    .catch((err) => {
     errorHandler(err, socket);
    });
  }

  function endVirtualSpace() {
   if (User.socket_id === VirtualSpace.creator_id || VirtualSpace.master) {
    NameSpace.to(VirtualSpace._id).emit("alerts", {
     message: `Metaverse room was ended by host`,
    });

    VirtualSpace.end()
     .then(() => {
      NameSpace.to(VirtualSpace._id).disconnectSockets();
     })
     .catch((err) => errorHandler(err, socket));
   }
  }

  function leaveVirtualSpace() {
   VirtualSpace.getSocketClients(NameSpace.in(VirtualSpace._id)).then(
    (viewers) => {
     NameSpace.to(VirtualSpace._id).emit("viewers", viewers);
    }
   );

   VirtualSpace.leave()
    .then(() => {
     socket.broadcast.to(VirtualSpace.id).emit("updates", {
      message: `${VirtualSpace.attendee.username} has left`,
     });

     //endVirtualSpace();
    })
    .catch((err) => errorHandler(err, socket));
  }

  function updateVirtualSpaceEnvironmentURL({ code, url, name }) {
   if (User.socket_id === VirtualSpace.creator_id || VirtualSpace.master) {
    VirtualSpace.updateEnvironmentWithURL(code, { url, name })
     .then((virtual_space) => {
      NameSpace.to(VirtualSpace._id).emit("3D", {
       message: `Updating room`,
       url: url,
      });
     })
     .catch((err) => errorHandler(err, socket));
   }
  }

  function sendMessageToChat({ message }) {
   const Message = require("../../services/message");
   try {
    VirtualSpace.chat.add(
     new Message(message, { sender: VirtualSpace.attendee })
    );
   } catch (err) {}
  }

  function updateAttributes(attributes) {
   if (User.socket_id === VirtualSpace.creator_id || VirtualSpace.master) {
    VirtualSpace.updateAttributes(attributes)
     .then((virtual_space) => {
      // Others
      NameSpace.to(VirtualSpace._id).emit("alerts", {
       message: "Metaverse attributes has changed",
       type: "info",
      });
      NameSpace.to(VirtualSpace._id).emit("attributes", { virtual_space });
     })
     .catch((err) => errorHandler(err, socket));
   }
  }

  function updateUserDetails({ username, theme }) {
   if (username !== VirtualSpace.attendee.username) {
    let current_username = VirtualSpace.attendee.username;
    VirtualSpace.attendee.username = username;
    NameSpace.to(VirtualSpace._id).emit("updates", {
     message: `${current_username} has changed their username to ${VirtualSpace.attendee.username}`,
    });
   }

   if (theme) {
    VirtualSpace.attendee.color = theme;
   }
  }
 });
};
